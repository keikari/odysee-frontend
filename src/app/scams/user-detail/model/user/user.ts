import {Email} from '../email/email';
import {Phone} from '../phone/phone';
import {YoutubeChannel} from '../youtube_channel/youtube-channel';
import {CreditCard} from '../credit_card/credit-card';
import {Access} from '../access/access';
import {DuplicateAccount} from '../duplicate_account/duplicate-account';
import {RedeemedReward} from '../redeemed-reward/redeemed-reward';
import {Install} from '../install/install';
import {Note} from '../note/note';
import {Inviter} from '../inviter/inviter';
import {OwnedChannel} from '../owned-channel/owned-channel';
import {InvitedUser} from '../invited-user/invited-user';
import {Tag} from '../tag/tag';


export class User {

  UserID: bigint;
  GivenName: string;
  FamilyName: string;
  RewardStatusChangeTrigger: string;
  Emails: Email[] = [];
  Phones: Phone[] = [];
  YoutubeChannels: YoutubeChannel[] = [];
  CreditCards: CreditCard[] = [];
  Accesses: Access[] = [];
  DuplicateAccounts: DuplicateAccount[] = [];
  RedeemedRewards: RedeemedReward[] = [];
  Installs: Install[] = [];
  Notes: Note[] = [];
  Inviter: Inviter[] = [];
  OwnedChannels: OwnedChannel[] = [];
  InvitedUsers: InvitedUser[] = [];
  Tags: Tag[] = [];
  PrimaryEmail: string;
  LastAccessTime: string;
  ReferredUsers: number;
  AcceptedInvites: number;
  RewardApproved: boolean;
  // Calculated Columns
  Duplicates: number;
  IsCountryMatch: boolean;
  Country: string;
  Countries: string;
  ISPs: string;
  LastNote: string;
  Verification: string;
  // For YT-verification
  YTChannelsAmount: number;
  YoutubeChannelID: string;
  YoutubeChannelName: string;
  DesiredChannelName: string;
  Status: string;
  Subscribers: number;
  Videos: number;
  Views: number;
  ShouldSync: boolean;
  Redeemable: boolean;
  Reviewed: boolean;

  constructor(u: any) {
    this.Duplicates = 0;
    this.UserID = u.user_id;
    this.GivenName = u.given_name;
    this.FamilyName = u.family_name;
    this.RewardStatusChangeTrigger = u.reward_status_change_trigger;
    this.ReferredUsers = u.referred_users;
    this.AcceptedInvites = u.accepted_invites;
    this.RewardApproved = u.reward_approved;
    this.IsCountryMatch = true;
    // Emails
    if (u.emails) {
      u.emails.forEach((e) => {
        const email = new Email();
        email.EmailAddress = e.email;
        email.IsVerified = e.verified;
        email.IsPrimary = e.primary;
        if (email.IsPrimary) {
          this.PrimaryEmail = email.EmailAddress;
        }
        this.Emails = this.Emails.concat(email);
      });
    }
    // Youtube Channels
    if (u.youtube_channels) {
      u.youtube_channels.forEach((y) => {
        const ytChannel = new YoutubeChannel();
        ytChannel.ChannelName = y.channel_name;
        ytChannel.ChannelID = y.channel_id;
        ytChannel.LBRYChannelName = y.lbry_channel_name;
        ytChannel.Subscribers = y.subscribers;
        ytChannel.Videos = y.videos === 0 ? 1 : y.videos;
        ytChannel.Views = y.views;
        ytChannel.RewardAmount = y.redeemable_reward;
        ytChannel.IsRedeemed = y.redeemed;
        ytChannel.Status = y.status;
        ytChannel.IsRedeemable = y.redeemable;
        ytChannel.Reviewed = y.reviewed;
        ytChannel.ShouldSync = y.should_sync;
        ytChannel.Ratio = ytChannel.Views / ytChannel.Videos;
        ytChannel.Suggestion = (ytChannel.Ratio > 1000) ? 'likely good' : 'likely bad';
        this.YoutubeChannels.push(ytChannel);
      });
      this.YoutubeChannels.sort((a, b) => a.Subscribers > b.Subscribers ? -1 : 1);
      this.YoutubeChannels.sort((a, b) => Number(a.Reviewed) - Number(b.Reviewed));
      this.YTChannelsAmount = this.YoutubeChannels.length;
      this.YoutubeChannelID = this.YoutubeChannels[0].ChannelID;
      this.YoutubeChannelName = this.YoutubeChannels[0].ChannelName;
      this.DesiredChannelName = this.YoutubeChannels[0].LBRYChannelName;
      this.Status = this.YoutubeChannels[0].Status;
      this.Subscribers = this.YoutubeChannels[0].Subscribers;
      this.Videos = this.YoutubeChannels[0].Videos;
      this.Views = this.YoutubeChannels[0].Views;
      this.ShouldSync = this.YoutubeChannels[0].ShouldSync;
      this.Redeemable = this.YoutubeChannels[0].IsRedeemable;
      this.Reviewed = this.YoutubeChannels[0].Reviewed;
    }
    // Credit Cards
    if (u.credit_cards) {
      u.credit_cards.forEach((c) => {
        const creditCard = new CreditCard();
        creditCard.CreadtedAt = new Date(c.created_at);
        creditCard.UpdatedAt = new Date(c.updated_at);
        this.CreditCards.push(creditCard);
      });
    }
    // Accesses
    if (u.accesses) {
      let match = this.IsCountryMatch;
      const lastCountry = u.accesses[0].country;
      this.Country = lastCountry;
      const countries = [];
      const isps = [];
      u.accesses.forEach((a) => {
        const access = new Access();
        access.IP = a.ip;
        access.Country = a.country;
        access.Score = a.score;
        access.AccessTime = new Date(a.time);
        access.ISP = a.isp;
        this.Accesses.push(access);
        if (lastCountry !== access.Country) {
          match = false;
        }
        countries.push(a.country);
        isps.push(a.isp);
      });
      this.Countries = [...new Set(countries)].join(',');
      this.ISPs = [...new Set(isps)].join(',');
      this.LastAccessTime = new Date(u.last_access).toISOString();
      this.IsCountryMatch = match;
    }
    // Phones
    if (u.phones) {
      let countryMatch = this.IsCountryMatch;
      u.phones.forEach((p) => {
        const phone = new Phone();
        phone.PhoneNumber = p.number;
        phone.Country = p.country;
        if (this.Country !== p.country) {
          countryMatch = false;
        }
        this.Phones.push(phone);
      });
      this.IsCountryMatch = countryMatch;
    }
    // Duplicate Accounts
    if (u.duplicate_accounts) {
      this.Duplicates = u.duplicate_accounts.length;
      u.duplicate_accounts.forEach((d) => {
        const duplicate = new DuplicateAccount();
        duplicate.UserID = d.user_id;
        duplicate.RewardStatusChangeTrigger = d.reward_status_change_trigger;
        duplicate.IsRewardsApproved = d.reward_enabled;
        duplicate.FirstIPMatch = d.first_ip_match;
        duplicate.CreatedAt = new Date(d.created_at);
        duplicate.PrimaryEmail = d.primary_email;
        duplicate.IsYouTuber = d.is_youtuber;
        this.DuplicateAccounts.push(duplicate);
      });
    }
    // Redeemed Rewards
    if (u.redeemed_rewards) {
      u.redeemed_rewards.forEach((r) => {
        const reward = new RedeemedReward();
        reward.Type = r.type;
        reward.Amount = r.amount;
        reward.CreatedAt = r.created_at;
        reward.Platform = r.platform;
        reward.TransactionID = r.transaction_id;
        this.RedeemedRewards.push(reward);
      });
    }
    // Installs
    if (u.installs) {
      u.installs.forEach((i) => {
        const install = new Install();
        install.Platform = i.platform;
        install.DeviceType = i.type;
        install.CreatedAt = new Date(i.created_at);
        install.UpdatedAt = new Date(i.updated_at);
        install.Domain = i.domain;
        this.Installs.push(install);
      });
    }
    // Notes
    if (u.notes) {
      u.notes.forEach((n) => {
        const note = new Note();
        note.Note = n.note;
        note.OldStatus = n.old_status;
        note.NewStatus = n.new_status;
        note.CommenterEmail = n.commenter_email;
        note.UpdatedAt = new Date(n.updated_at);
        this.Notes.push(note);
        this.LastNote = note.Note;
      });
    }
    // Inviter
    if (u.inviter) {
      const inviter = new Inviter();
      inviter.InvitedUsers = u.inviter.invited_users;
      inviter.InviteRewards = u.inviter.invite_rewards;
      inviter.IsEmailVerified = u.inviter.is_email_verified;
      inviter.PrimaryEmail = u.inviter.primary_email;
      inviter.RewardEnabled = u.inviter.reward_enabled;
      inviter.RewardStatusChangeTrigger = u.inviter.reward_status_change_trigger;
      inviter.TotalRedeemedRewards = u.inviter.total_redeemed_rewards;
      inviter.UserID = u.inviter.user_id;
      inviter.IsYouTuber = u.inviter.is_youtuber;
      this.Inviter.push(inviter);
    }
    // OwnedChannels
    if (u.owned_channels) {
      u.owned_channels.forEach((o) => {
        const ownedChannel = new OwnedChannel();
        ownedChannel.URI = o.uri;
        ownedChannel.SignedStreams = o.signed_streams;
        ownedChannel.ViewRateFactor = o.view_rate_factor;
        this.OwnedChannels.push(ownedChannel);
      });
    }
    // InvitedUsers
    if (u.invited_users) {
      u.invited_users.forEach((i) => {
        const invitedUser = new InvitedUser();
        invitedUser.UserID = i.user_id;
        invitedUser.IsEmailVerified = i.is_email_verified;
        invitedUser.PrimaryEmail = i.primary_email;
        invitedUser.RewardEnabled = i.reward_enabled;
        invitedUser.RewardStatusChangeTrigger = i.reward_status_change_trigger;
        invitedUser.TotalRedeemedRewards = i.total_redeemed_rewards;
        invitedUser.IsYouTuber = i.is_youtuber;
        this.InvitedUsers.push(invitedUser);
      });
    }
    // UserTags
    if (u.user_tags) {
      u.user_tags.forEach((t) => {
        const tag = new Tag();
        tag.Id = t.tag_id;
        tag.IsRemoved = t.is_removed;
        this.Tags.push(tag);
      });
    }
    return this;
  }

  getCSSColor(fieldName: string): any {
    const defaultColor = {
      'background-color': '#FFFFFF'
    };
    if (fieldName === 'Duplicates') {
      let hasApprovedDups = false
      this.DuplicateAccounts.forEach(element => {
        if (element.IsRewardsApproved) {
          hasApprovedDups = true
        }
      });
      if (hasApprovedDups) {
        return {
          'background-color': '#8bff86'
        };
      }
    }
    if (fieldName === 'RewardStatusChangeTrigger' || fieldName === 'Note') {
      if (this.RewardApproved) {
        return {
          'background-color': '#8bff86'
        };
      }
      return {
        'background-color': '#ffab99'
      };
    }
    if (fieldName === 'Status') {
      if (this.Status == 'queued')
        return {
          'background-color': 'lightgoldenrodyellow'
        };
      if (this.Status == 'abandoned')
        return {
          'background-color': 'lightcoral'
        };
      if (this.Status == 'synced')
        return {
          'background-color': 'lightgreen'
        };
    }
    if (fieldName !== 'UserID') {
      return defaultColor;
    }

    if (this.InvitedUsers.length === 0 && this.Inviter.length === 0) {
      return defaultColor;
    } else if (this.InvitedUsers.length === 0 && this.Inviter.length > 0) {
      return {
        'background-color': '#10fcff'
      };
    } else if (this.InvitedUsers.length > 0 && this.Inviter.length === 0) {
      return {
        'background-color': '#8bff86'
      };
    } else if (this.InvitedUsers.length > 0 && this.Inviter.length > 0) {
      return {
        'background-color': '#ffb7e0'
      };
    }
    return defaultColor;
  }

  getTitle(fieldName: string): string {
    if (fieldName === 'LastAccessTime') {
      return this.LastAccessTime;
    }
    if (fieldName === 'PrimaryEmail') {
      return this.PrimaryEmail;
    }
    if (fieldName !== 'UserID') {
      return this.LastNote;
    }
    return 'Invited:' + this.ReferredUsers + '  Inviter:' + this.Inviter.length +
      ' Accepted:' + this.AcceptedInvites;
  }
}
