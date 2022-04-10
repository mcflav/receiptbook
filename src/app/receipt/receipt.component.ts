import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptsService } from '../services/receipts.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  @ViewChild('f') receiptForm: NgForm;
  user: {email: string, firstname: string, lastname: string, id: string};
  error: string = null;
  submitted = false;
  getReceipts = [];
  newReceipt;
  receiptDate;
  currentDate;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private receiptsService: ReceiptsService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
      this.user = {
        email: this.route.snapshot.params['email'],
        firstname: this.route.snapshot.params['firstname'],
        lastname: this.route.snapshot.params['lastname'],
        id: this.route.snapshot.params['id']
      }
      this.error = null;
      this.submitted = false;
      this.dataStorageService.autoLogin();

  }

  onSubmit(){
    if(this.receiptForm.value.payment_type === ''){
      this.error = "Please select a payment type.";
    }else {
      this.submitted = true;
      this.receiptDate = new Date(this.receiptForm.value.receiptDate);

      this.receiptsService.addReceipt({receiptDate: this.receiptDate, receivedFrom: this.receiptForm.value.receivedFrom,
        amount: this.receiptForm.value.amount.toFixed(2), paymentOf: this.receiptForm.value.paymentOf, paymentType: this.receiptForm.value.payment_type,
        signature: this.receiptForm.value.signature, email: this.user.email, user: this.user.id});

      this.dataStorageService.storeReceipt({receiptDate: this.receiptDate, receivedFrom: this.receiptForm.value.receivedFrom,
        amount: this.receiptForm.value.amount.toFixed(2), paymentOf: this.receiptForm.value.paymentOf, paymentType: this.receiptForm.value.payment_type,
        signature: this.receiptForm.value.signature, email: this.user.email, user: this.user.id})
        .subscribe(data => {
            console.log(data);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        });
    }

  }

  onDisplayClicked(){
      this.router.navigate(['/displayReceipt', this.user.email, this.user.firstname, this.user.lastname, this.user.id], {relativeTo: this.route});
  }

  onEditAccounts(){
    this.router.navigate(['/editAccounts', this.user.email, this.user.firstname, this.user.lastname, this.user.id], {relativeTo: this.route});
}

  clearSubmitMessage(){
    this.submitted = false;
  }

  onHandleError(){
    this.error = null;
  }

}
