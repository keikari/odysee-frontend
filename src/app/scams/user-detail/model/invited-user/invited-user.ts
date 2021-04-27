import {AdditionalUser} from '../additional-user/additional-user';

export class InvitedUser extends AdditionalUser {
  IsEmailVerified: boolean;
  RedeemedRewards: number;

  constructor(
    UserID: bigint,
    PrimaryEmail: string,
    RewardStatusChangeTrigger: string,
    IsRewardsApproved: boolean,
    IsYouTuber: boolean,
    IsEmailVerified: boolean,
    RedeemedRewards: number) {
    super(UserID, PrimaryEmail, RewardStatusChangeTrigger, IsRewardsApproved, IsYouTuber);
    this.IsEmailVerified = IsEmailVerified;
    this.RedeemedRewards = RedeemedRewards;
  }
}
