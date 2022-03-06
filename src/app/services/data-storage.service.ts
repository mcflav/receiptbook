import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { ReceiptsService } from '../services/receipts.service';
import { Receipt } from '../models/receipt.model';
import { ValidateUser } from '../models/validateUser.model';
import { Users } from '../models/users.model';
import { UserLogin } from '../models/userLogin.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

interface StoreUsersResponseData{
    email: string,
    firstname: string,
    lastname: string
}

interface ValidateUserResponseData {
    auth: boolean,
    token: string
}

interface StoreReceiptResponseData {
  id?: string,
  receiptDate: string,
  receivedFrom: string,
  amount: number,
  paymentOf: string,
  paymentType: string,
  signature: string,
  email: string;
  user: string
}

@Injectable({providedIn: 'root'})
export class DataStorageService {
    user = new BehaviorSubject<ValidateUser>(null);
    elapsedTime = 86400;
    milliseconds = 1000;
    receipts: [] = [];
    private tokenExpirationTimer: any;
    private _expirationDate = new Date(new Date().getTime() + this.elapsedTime * this.milliseconds);

    constructor(private http: HttpClient,
        private usersService: UsersService,
        private receiptsService: ReceiptsService,
        private router: Router){}

    storeUser(user: Users) {
      console.log(user);
        const body = user;
        return this.http.post<StoreUsersResponseData>('https://intense-brushlands-88175.herokuapp.com/api/v1/users',
          body).pipe(catchError(this.handleError));
    }

    storeReceipt(receipt: Receipt) {
      console.log(receipt);
        const body = receipt;
        return this.http.post<StoreReceiptResponseData>('https://intense-brushlands-88175.herokuapp.com/api/v1/receipts',
          body).pipe(catchError(this.handleError));
    }

    fetchUsers(){
        return this.http.get<Users[]>('https://intense-brushlands-88175.herokuapp.com/api/v1/users')
            .pipe(catchError(this.handleError));
    }

    fetchReceipts(userId: string) {
        return this.http.post('https://intense-brushlands-88175.herokuapp.com/api/v1/receipts/userReceipts',
            {
                user: userId
            }
        ).pipe(catchError(this.handleError));
    }

    fetchReceiptsByEmail(email: string) {
        return this.http.post('https://intense-brushlands-88175.herokuapp.com/api/v1/receipts/receiptsByEmail',
            {
                email: email
            }
        ).pipe(catchError(this.handleError));
    }

    validateUser(user: UserLogin) {
        const body = user;
        return this.http.post<ValidateUserResponseData>('https://intense-brushlands-88175.herokuapp.com/api/v1/authentication',
            body).pipe(catchError(this.authenticationError),
            tap(resData => {
                this.handleAuthentication(
                    resData.auth,
                    resData.token
                );
            })
        );
    }

    autoLogin() {
      const userData: {
          auth: boolean;
          _token: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if(!userData){
          return;
      }

      const loadedUser = new ValidateUser(
          userData.auth,
          userData._token,
          this._expirationDate
      );

      if(loadedUser.token){
          this.user.next(loadedUser);
          const expirationDuration =
            new Date(this._expirationDate).getTime() - new Date().getTime();
      }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(auth: boolean, token:string) {
        const expirationDate = new Date(
            new Date().getTime() + this.elapsedTime * this.milliseconds
        );

        const user = new ValidateUser(
            auth,
            token,
            expirationDate
        );

        this.user.next(user);
        this.autoLogout(this.elapsedTime * this.milliseconds);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        const errorMessage = errorRes.error;
        return throwError(errorMessage);
    }

    private authenticationError(errorRes: HttpErrorResponse) {
        let errorMessage;
        if(errorRes.status === 400 || (errorRes.status === 401 && errorRes.error.token !== null) ||
        (errorRes.status === 401 && errorRes.error.token === null)) {
            errorMessage = "Invalid Username or Password.";
        }
        return throwError(errorMessage);
    }
}

