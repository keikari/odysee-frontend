import {AdditionalUser} from '../additional-user/additional-user';

export class DuplicateAccount extends AdditionalUser {
  FirstIPMatch: string;
  CreatedAt: string;

  constructor(
    UserID: bigint,
    PrimaryEmail: string,
    RewardStatusChangeTrigger: string,
    IsRewardsApproved: boolean,
    IsYouTuber: boolean,
    FirstIPMatch: string,
    CreatedAt: string) {
    super(UserID, PrimaryEmail, RewardStatusChangeTrigger, IsRewardsApproved, IsYouTuber);
    this.FirstIPMatch = FirstIPMatch;
    this.CreatedAt = CreatedAt;
  }
}
