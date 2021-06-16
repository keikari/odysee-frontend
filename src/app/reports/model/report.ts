import {User} from './user';

export class Report {
  ReportID: number;
  Email: string;
  Type: string;
  Category: string;
  ClaimID: string;
  TXID: string;
  Vout: number;
  Status: string;
  ReviewerComment: string;
  Details: string;
  CreatedAt: string;
  UpdatedAt: string;
  User: User;

  constructor(r: any) {
    this.ReportID = r.id;
    this.Type = r.type;
    this.Category = r.category;
    this.ClaimID = r.claim_id;
    this.TXID = r.tx_id;
    this.Vout = r.vout;
    this.Status = r.status;
    if (r.reviewer_comment != null) {
      this.ReviewerComment = r.reviewer_comment;
    }
    this.Details = JSON.stringify(r.details);
    this.CreatedAt = r.created_at;
    this.UpdatedAt = r.updated_at;
    this.Email = r.user.primary_email;
    this.User = new User(r.user);
  }
}
