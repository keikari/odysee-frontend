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
  PrimaryEmail: string;
  LastAccessTime: string;
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
    return this;
  }
}
