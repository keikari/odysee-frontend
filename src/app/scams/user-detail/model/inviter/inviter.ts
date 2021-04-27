import {AdditionalUser} from '../additional-user/additional-user';

export class Inviter extends AdditionalUser {
  IsEmailVerified: boolean;
  TotalRedeemedRewards: Number;
  InvitedUsers: Number;
  InviteRewards: Number;

  constructor(
    UserID: bigint,
    PrimaryEmail: string,
    RewardStatusChangeTrigger: string,
    IsRewardsApproved: boolean,
    IsYouTuber: boolean,
    IsEmailVerified: boolean,
    TotalRedeemedRewards: Number,
    InvitedUsers: Number,
    InviteRewards: Number) {
    super(UserID, PrimaryEmail, RewardStatusChangeTrigger, IsRewardsApproved, IsYouTuber);
    this.IsEmailVerified = IsEmailVerified;
    this.TotalRedeemedRewards = TotalRedeemedRewards;
    this.InvitedUsers = InvitedUsers;
    this.InviteRewards = InviteRewards;
  }
}
