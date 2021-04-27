export class FileView {
  URI: string;
  ViewedAt: Date;

  constructor(URI: string, ViewedAt: Date) {
    this.URI = URI;
    this.ViewedAt = ViewedAt;
  }
}
