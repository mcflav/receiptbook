import { Receipt } from '../models/receipt.model';
import { Subject } from 'rxjs';

export class ReceiptsService {
  receiptChanged = new Subject<Receipt[]>()
  private receipts = [];
  private myReceipts = [];
  private myReceiptsByDate = [];
  private receiptDate;
  private convertReceiptDate;
  private convertFromDate;
  private convertToDate;
  private fromDate;
  private toDate;
  private shortDate;

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

  getReceiptsByDate(receipts: Receipt[], startDate: Date, endDate: Date){
    this.myReceiptsByDate = [];
    this.fromDate = new Date(startDate);
    this.toDate = new Date(endDate);

    for (let i = 0; i < receipts.length; i++) {
      this.receiptDate = new Date(this.receipts[i].receiptDate);
      this.convertReceiptDate = this.receiptDate.toUTCString();
      this.shortDate = this.convertReceiptDate.split(' ').slice(0, 4).join(' ');
      this.convertFromDate = startDate.toUTCString();
      this.convertToDate = endDate.toUTCString();
      this.fromDate = this.convertFromDate.split(' ').slice(0, 4).join(' ');
      this.toDate = this.convertToDate.split(' ').slice(0, 4).join(' ');

      if(this.shortDate >= this.fromDate && this.shortDate <= this.toDate) {
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
