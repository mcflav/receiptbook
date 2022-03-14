import { Receipt } from '../models/receipt.model';
import { Subject } from 'rxjs';

export class ReceiptsService {
  receiptChanged = new Subject<Receipt[]>()
  private receipts = [];
  private myReceipts = [];
  private myReceiptsByDate = [];
  private receiptDate;
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

  getReceiptsByDate(receipts: Receipt[], startDate: string, endDate: string){
    this.myReceiptsByDate = [];

    for (let i = 0; i < receipts.length; i++) {
      this.receiptDate = new Date(this.receipts[i].receiptDate);
      this.shortDate = this.receiptDate.toLocaleDateString();
      if(this.shortDate >= startDate && this.shortDate <= endDate) {
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
