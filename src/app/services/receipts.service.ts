import { Receipt } from '../models/receipt.model';
import { Subject } from 'rxjs';

export class ReceiptsService {
  receiptChanged = new Subject<Receipt[]>()
  private receipts = [];
  private myReceipts = [];
  private myReceiptsByDate = [];
  private fromDate;
  private toDate;

  getReceipts(){
    return this.receipts;
  }

  getReceipt(email: string){
    this.myReceipts = [];
    for (let i = 0; i < this.receipts.length; i++) {
      if(this.receipts[i].email === email) {
          this.myReceipts.push(this.receipts[i]);
      }

    }
    return this.myReceipts;
  }

  getReceiptsByDate(receipts: Receipt[], startDate: string, endDate: string){
    this.myReceiptsByDate = [];
    this.fromDate = new Date(startDate);
    this.toDate = new Date(endDate);
    console.log(this.receipts.length);

    for (let i = 0; i < receipts.length; i++) {
      console.log("receipt date: " + this.receipts[i].receiptDate);
      console.log ("startDate: " + startDate + "   endDate: " + endDate);
      if(this.receipts[i].receiptDate >= startDate && this.receipts[i].receiptDate <= endDate) {
          this.myReceiptsByDate.push(this.receipts[i]);
      }
    }

    if(this.myReceiptsByDate.length === 0) {
      this.myReceiptsByDate.push("No Receipts");
    }
    return this.myReceiptsByDate;
  }

  setReceipt(receipt) {
      this.receipts = receipt;
      this.receiptChanged.next(this.receipts);
  }

  addReceipt(receipt: Receipt) {
      this.receipts.push(receipt);
      this.receiptChanged.next(this.receipts.slice());
  }


}
