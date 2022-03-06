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
    this.dataStorageService.fetchReceipts(this.user.id)
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

  onBack(){
    this.router.navigate(['/receipt', this.user.email, this.user.firstname, this.user.lastname], {relativeTo: this.route});
  }

  onHandleError(){
    this.error = null;
  }

}
