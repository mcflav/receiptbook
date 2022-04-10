import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptsService } from '../services/receipts.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.css']
})
export class EditAccountsComponent implements OnInit {
  @ViewChild('f') receiptForm: NgForm;
  user: {email: string, firstname: string, lastname: string, id: string};
  error: string = null;
  submitted = false;
  getReceipts;
  noReceipts;
  receipt = {
    date: '',
    receivedFrom: '',
    amount: '',
    paymentOf: '',
    paymentType: '',
    signature: '',
  }
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
    this.getReceipts = [];
    this.displayReceipts(this.user.id);
  }

  onSubmit(){
    this.error = null;
    this.receipt.date = this.receiptForm.value.receiptDate;
    this.receipt.receivedFrom = this.receiptForm.value.receivedFrom;
    this.receipt.amount = this.receiptForm.value.amount;
    this.receipt.paymentOf = this.receiptForm.value.paymentOf;
    this.receipt.paymentType = this.receiptForm.value.payment_type;
    this.receipt.signature = this.receiptForm.value.signature;

    console.log(this.receipt.paymentType);

    this.dataStorageService.updateReceipt(this.receiptForm.value.receiptId, this.receipt.date, this.receipt.receivedFrom,
      Number(this.receipt.amount), this.receipt.paymentOf, this.receipt.paymentType, this.receipt.signature,
      this.user.email, this.user.id)
      .subscribe(data => {
          console.log(data);
          this.submitted = true;
      },
      errorMessage => {
          this.error = errorMessage;
      })
  }

  onBack(){
    this.router.navigate(['/receipt', this.user.email, this.user.firstname, this.user.lastname, this.user.id], {relativeTo: this.route});
  }

  displayReceipts(userid: string){
    this.dataStorageService.fetchReceipts(userid)
      .subscribe(data => {
          console.log(data);
          this.receiptsService.setReceipt(data);
          this.getReceipts = this.receiptsService.getReceipts();
          this.noReceipts = this.getReceipts[0];
          if(this.noReceipts === undefined){
            this.error = "There are no receipts for this account!";
          }
      },
      errorMessage => {
          this.error = errorMessage;
      })
  }

  clearSubmitMessage(){
    this.submitted = false;
  }

  onHandleError(){
    this.error = null;
  }

}
