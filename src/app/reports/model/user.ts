export class User {
  PrimaryEmail: string
  AdditionEmail: string
  ChannelName: string
  ChannelClaimID: string
  Country: string
  Address: string
  Phone: string
  State: string
  Signature: string

  constructor(u: any) {
    this.PrimaryEmail = u.primary_email;
    if (u.AdditionEmail != null)
      this.AdditionEmail = u.addition_email;
    if (u.reporter_channel_name != null)
      this.ChannelName = u.channel_name;
    if (u.reporter_channel_claim_id != null)
      this.ChannelClaimID = u.channel_claim_id;
    if (u.country != null)
      this.Country = u.country;
    if (u.address != null)
      this.Address = u.address;
    if (u.phone != null)
      this.Phone = u.phone;
    if (u.state != null)
      this.State = u.state;
    if (u.signature != null)
      this.Signature = u.signature;
  }
}
