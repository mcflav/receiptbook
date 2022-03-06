export class Receipt {
  public receiptDate: String;
  public receivedFrom: string;
  public amount: number;
  public paymentOf: string;
  public paymentType: string;
  public signature: string;
  public email: string;
  public user: string;

  constructor(receiptDate: String, receivedFrom: string, amount: number, paymentOf: string, paymentType: string,
    signature: string, email: string, user: string){
    this.receiptDate = receiptDate;
    this.receivedFrom = receivedFrom;
    this.amount = amount;
    this.paymentOf = paymentOf;
    this.paymentType = paymentType;
    this.signature = signature;
    this.email = email;
    this.user = user;
  }
}
