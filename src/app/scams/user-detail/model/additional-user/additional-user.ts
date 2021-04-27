export class AdditionalUser {
  UserID: bigint;
  PrimaryEmail: string;
  RewardStatusChangeTrigger: string;
  IsRewardsApproved: boolean;
  IsYouTuber: boolean;
  constructor(UserID: bigint, PrimaryEmail: string, RewardStatusChangeTrigger: string, IsRewardsApproved: boolean, IsYouTuber: boolean) {
    this.UserID = UserID;
    this.PrimaryEmail = PrimaryEmail;
    this.RewardStatusChangeTrigger = RewardStatusChangeTrigger;
    this.IsRewardsApproved = IsRewardsApproved;
    this.IsYouTuber = IsYouTuber;
  }
}
