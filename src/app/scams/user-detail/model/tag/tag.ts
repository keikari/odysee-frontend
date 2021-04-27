export class Tag {
  Id: number;
  IsRemoved: boolean;
  Name: string;

  constructor(Id: number, IsRemoved: boolean, Name: string) {
    this.Id = Id;
    this.IsRemoved = IsRemoved;
    this.Name = Name;
  }
}
