export class RedeemedReward {
  Type: string;
  Amount: Number;
  CreatedAt: Date;
  Platform: string;
  TransactionID: string;

  constructor(Type: string, Amount: Number, CreatedAt: Date, Platform: string, TransactionID: string) {
    this.Type = Type;
    this.Amount = Amount;
    this.CreatedAt = CreatedAt;
    this.Platform = Platform;
    this.TransactionID = TransactionID;
  }
}
