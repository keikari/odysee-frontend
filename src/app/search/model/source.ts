export class Source {
  view_cnt:           number;
  fee:                number;
  channel:            string;
  description:        string;
  language:           string;
  title:              string;
  thumbnail_url:      string;
  sub_cnt:            number;
  duration:           number;
  content_type:       string;
  transaction_time:   Date;
  id:                 number;
  release_time:       Date;
  certificate_amount: number;
  frame_width:        number;
  cert_valid:         boolean;
  claim_type:         string;
  claimId:            string;
  bid_state:          string;
  frame_height:       number;
  claim_cnt:          number;
  tags:               string[];
  channel_claim_id:   string;
  name:               string;
  effective_amount:   number;
  stripped_name:      string;

  constructor(json: any) {
    this.name = json.name;
    this.thumbnail_url = json.thumbnail_url;
    this.certificate_amount = json.certificate_amount;
    this.effective_amount = json.effective_amount;
    this.release_time = json.release_time;
    this.view_cnt = json.view_cnt;
    this.sub_cnt = json.sub_cnt;
    this.channel = json.channel;
    this.channel_claim_id = json.channel_claim_id;
    this.claimId = json.claimId;
    this.title = json.title;
  }
}
