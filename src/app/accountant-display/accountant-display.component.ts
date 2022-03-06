import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptsService } from '../services/receipts.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-accountant-display',
  templateUrl: './accountant-display.component.html',
  styleUrls: ['./accountant-display.component.css']
})
export class AccountantDisplayComponent implements OnInit {
  @ViewChild('f') displayForm: NgForm;
  getReceipts = [];
  getReceiptsByDate = [];
  id: string;
  viewRange = false;
  viewAll = false;
  noReceipts;
  error: string = null;

  constructor(private router: Router,
      private route: ActivatedRoute,
      private receiptsService: ReceiptsService,
      private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
      this.error = null;
  }

  onView(){
    this.viewRange = true;
    this.viewAll = false;
    this.dataStorageService.fetchReceiptsByEmail(this.displayForm.value.email)
      .subscribe(data => {
          console.log(data);
          this.receiptsService.setReceipt(data);
          this.getReceipts = this.receiptsService.getReceipts();
          this.getReceiptsByDate = this.receiptsService.getReceiptsByDate(this.getReceipts, this.displayForm.value.fromDate, this.displayForm.value.toDate);
          this.noReceipts = this.getReceiptsByDate[0];
          if(this.noReceipts === "No Receipts" || this.noReceipts === undefined){
            this.error = "There are no receipts for this date range or you entered an incorrect date format!";
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
    this.dataStorageService.fetchReceiptsByEmail(this.displayForm.value.email)
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

  onBack(){
    this.router.navigate([''], {relativeTo: this.route});
  }

  onHandleError(){
    this.error = null;
  }

}
