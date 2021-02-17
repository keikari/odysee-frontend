export class Report {
  ID: number;
  ReportedByID: number;
  Email: string;
  URI: string;
  TagName: string;
  ReporterComment: string;
  IsActionTaken: any; //boolean or null
  ReviewedById: boolean;
  ReviewerComment: string;
  CreatedAt: string;

  constructor(r: any) {
    this.ID = r.id;
    this.ReportedByID = r.reported_by_id;
    this.Email = r.email;
    this.URI = r.uri;
    this.TagName = r.tag_name;
    this.ReporterComment = r.reporter_comment;
    this.IsActionTaken = r.is_action_taken;
    this.ReviewedById = r.reviewed_by_id;
    this.ReviewerComment = r.reviewer_comment;
    this.CreatedAt = r.created_at;
  }

}
