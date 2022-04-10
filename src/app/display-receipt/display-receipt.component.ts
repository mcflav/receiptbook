import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiptsService } from '../services/receipts.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-display-receipt',
  templateUrl: './display-receipt.component.html',
  styleUrls: ['./display-receipt.component.css']
})
export class DisplayReceiptComponent implements OnInit {
  @ViewChild('f') displayForm: NgForm;
  user: {email: string, firstname: string, lastname: string, id: string};
  getReceipts = [];
  getReceiptsByDate = [];
  fromDate;
  toDate;
  myString;
  myReceipt;
  id: string;
  noReceipts;
  amount;
  email;
  paymentOf;
  paymentType;
  receiptDate;
  receivedFrom;
  signature;
  userId;
  receiptid;
  viewRange = false;
  viewAll = false;
  receiptFound = false;
  noRequestId = true;
  error: string = null;

  constructor(private router: Router,
      private route: ActivatedRoute,
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
      this.dataStorageService.autoLogin();
  }

  onView(){
    this.viewRange = true;
    this.viewAll = false;
    this.receiptFound = false;
    this.dataStorageService.fetchReceipts(this.user.id)
      .subscribe(data => {
          console.log(data);
          this.receiptsService.setReceipt(data);
          this.getReceipts = this.receiptsService.getReceipts();
          this.getReceiptsByDate = this.receiptsService.getReceiptsByDate(this.getReceipts,
            this.fromDate = new Date(this.displayForm.value.fromDate), this.toDate = new Date(this.displayForm.value.toDate));
          this.noReceipts = this.getReceiptsByDate[0];
          if(this.noReceipts === "No Receipts" || this.noReceipts === undefined){
            this.error = "There are no receipts for this date range!";
            this.viewRange = false;
          }
      },
      errorMessage => {
          this.error = errorMessage;
      });
  }

  onViewAll(){
    this.viewAll = true;
    this.viewRange = false;
    this.receiptFound = false;
    this.dataStorageService.fetchReceipts(this.user.id)
      .subscribe(data => {
          console.log(data);
          this.receiptsService.setReceipt(data);
          this.getReceipts = this.receiptsService.getReceipts();
          this.noReceipts = this.getReceipts[0];
          if(this.noReceipts === undefined){
            this.error = "There are no receipts for this account!";
            this.viewAll = false;
          }
      },
      errorMessage => {
          this.error = errorMessage;
      })
  }

  onSearchById(){
    this.viewAll = false;
    this.viewRange = false;
    this.receiptFound = false;
    if(this.displayForm.value.receiptId === ''){
        this.error = "Please enter a valid ReceiptId!";
    }else {
      this.dataStorageService.fetchReceiptById(this.displayForm.value.receiptId)
      .subscribe(data => {
          this.receiptFound = true;
          this.myString = JSON.stringify(data);
          this.myReceipt = JSON.parse(this.myString);
          this.amount = this.myReceipt.amount;
          this.email = this.myReceipt.email;
          this.paymentOf = this.myReceipt.paymentOf;
          this.paymentType = this.myReceipt.paymentType;
          this.receiptDate = this.myReceipt.receiptDate;
          this.receivedFrom = this.myReceipt.receivedFrom;
          this.signature = this.myReceipt.signature;
          this.receiptid = this.myReceipt._id;
          console.log(this.receiptid);
      },
      errorMessage => {
          this.error = errorMessage;
      })
    }
  }

  onBack(){
    this.router.navigate(['/receipt', this.user.email, this.user.firstname, this.user.lastname, this.user.id], {relativeTo: this.route});
  }

  onHandleError(){
    this.error = null;
  }

}
