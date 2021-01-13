export class YtChannel {
  UserID: number;
  UserRewardEnabled: boolean;
  YoutubeChannelID: string;
  DesiredChannelName: string;
  Subscribers: number;
  Videos: number;
  Views: number;
  PotentialRewardAmount: number;
  CreatedAt: Date;
  ShouldSync: boolean;
  Redeemable: boolean;
  Reviewed: boolean;


  constructor(yt: any) {
    this.UserID = yt.user_id;
    this.UserRewardEnabled = yt.user_reward_enabled;
    this.YoutubeChannelID = yt.youtube_channel_id;
    this.DesiredChannelName = yt.desired_channel_name;
    this.Subscribers = yt.subscribers;
    this.Videos = yt.videos;
    this.Views = yt.views;
    this.ShouldSync = yt.should_sync;
    this.Redeemable = yt.redeemable;
    this.PotentialRewardAmount = yt.potential_reward_amount;
    this.Reviewed = yt.reviewed;
    this.CreatedAt = yt.created_at;
    return this;
  }
}
