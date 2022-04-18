import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DataStorageService } from '../services/data-storage.service';
import { ReceiptsService } from '../services/receipts.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})

export class DeleteAccountComponent implements OnInit {
  @ViewChild ('f') deleteForm: NgForm;
  accountDeleted = false;
  receiptsDeleted = false;
  error: string = null;
  user: {id: string, email: string, firstname: string, lastname: string}
  email;
  firstname;
  lastname;
  noReceipts;
  receipts = [];
  deletedReceipts = [];
  deletedUser = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private dataStorageService: DataStorageService,
    private receiptsService: ReceiptsService){}

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params['id'],
      email: this.route.snapshot.params['email'],
      firstname: this.route.snapshot.params['firstname'],
      lastname: this.route.snapshot.params['lastname']
    }
    this.error = null;
    this.email = this.user.email;
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.dataStorageService.autoLogin();


  }

  onDelete(name: string) {
    this.receiptsDeleted = false;
    this.accountDeleted = false;
    if(confirm("Are you sure you want to delete this " + name)) {
      this.dataStorageService.fetchReceiptsByEmail(this.email)
      .subscribe(data => {
        this.receiptsService.setReceipt(data);
        this.receipts = this.receiptsService.getReceipts();
        this.noReceipts = this.receipts[0];
        if(this.noReceipts === undefined){
          this.error = "There are no receipts for this account!";
        } else {
          for( let i = 0; i < this.receipts.length; i++){
            this.dataStorageService.deleteReceipt(this.receipts[i]._id)
            .subscribe(data => {
                console.log(data);
                this.deletedReceipts.push(data);
            });
          }
          this.receiptsDeleted = true;
        }
      },
      errorMessage => {
        this.error = errorMessage;
      });

      this.dataStorageService.deleteUser(this.user.id)
      .subscribe(data => {
        this.accountDeleted = true;
        this.deletedUser.push(data);
      },
      errorMessage => {
        this.error = errorMessage;
      })
    }
  }

  onBack() {
    this.router.navigate(['/receipt', this.user.email, this.user.firstname, this.user.lastname, this.user.id], {relativeTo: this.route});
  }

  onHandleError(){
    this.error = null;
  }
}
