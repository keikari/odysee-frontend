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
  PrimaryEmail: string;
  LastAccessTime: string;
  ReferredUsers: number;
  AcceptedInvites: number;
  RewardApproved: boolean;
  // Calculated Columns
  Duplicates: number;
  IsCountryMatch: boolean;
  Country: string;
  LastNote: string;
  Verification: string;

  constructor(u: any) {
    this.Duplicates = 0;
    this.UserID = u.user_id;
    this.GivenName = u.given_name;
    this.FamilyName = u.family_name;
    this.RewardStatusChangeTrigger = u.reward_status_change_trigger;
    this.ReferredUsers = u.referred_users;
    this.AcceptedInvites = u.accepted_invites;
    this.RewardApproved = u.reward_approved;
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
    // Phones
    if (u.phones) {
      u.phones.forEach((p) => {
        const phone = new Phone();
        phone.PhoneNumber = p.number;
        phone.CountryCode = p.country_code;
        this.Phones.push(phone);
      });
    }
    // Youtube Channels
    if (u.youtube_channels) {
      u.youtube_channels.forEach((y)  => {
        const ytChannel = new YoutubeChannel();
        ytChannel.ChannelName = y.channel_name;
        ytChannel.ChannelID = y.channel_id;
        ytChannel.LBRYChannelName = y.lbry_channel_name;
        ytChannel.Subscribers = y.subscribers;
        ytChannel.Videos = y.videos;
        ytChannel.RewardAmount = y.redeemable_reward;
        ytChannel.IsRedeemed = y.redeemed;
        ytChannel.Status = y.status;
        ytChannel.ShouldEmail = false;
        ytChannel.ApplyDisabled = true;
        ytChannel.IsRedeemable = y.redeemable;
        ytChannel.ShouldSync = y.should_sync;
        this.YoutubeChannels.push(ytChannel);
      });
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
      let match = true;
      const lastCounty = u.accesses[0].country;
      this.Country = lastCounty;
      u.accesses.forEach((a) => {
        const access = new Access();
        access.IP = a.ip;
        access.Country = a.country;
        access.Score = a.score;
        access.AccessTime = new Date(a.time);
        access.ISP = a.isp;
        this.Accesses.push(access);
        if (lastCounty !== access.Country) {
          match = false;
        }
      });
      this.LastAccessTime = new Date(u.last_access).toISOString();
      this.IsCountryMatch = match;
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
        duplicate.PrimaryEmail = d.primary_email;
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
        this.Inviter.push(inviter);
    }
    // OwnedChannels
    if (u.owned_channels) {
      u.owned_channels.forEach((o) => {
      const ownedChannel = new OwnedChannel();
      ownedChannel.URI = o.uri;
      ownedChannel.SignedStreams = o.signed_streams;
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
        this.InvitedUsers.push(invitedUser);
      });
    }
    return this;
  }
  getCSSColor(fieldName: string): any {
    const defaultColor = {
      'background-color': '#FFFFFF'
    };

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
