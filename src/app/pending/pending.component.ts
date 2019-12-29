import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';
import {User} from './model/user/user';
import {Email} from './model/email/email';
import {Phone} from './model/phone/phone';
import {YoutubeChannel} from './model/youtube_channel/youtube-channel';
import {CreditCard} from './model/credit_card/credit-card';
import {Access} from './model/access/access';
import {DuplicateAccount} from './model/duplicate_account/duplicate-account';
import {Install} from './model/install/install';
import {Note} from './model/note/note';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  DisplayedUsers: User[] = [];
  pendingUsers: User[] = [];
  userColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'Duplicates', header: 'Duplicates', width: '13px'},
    {field: 'Verification', header: 'Verification'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'LastAccessTime', header: 'Last Access'},
    {field: 'IsCountryMatch', header: 'Country Match'},
    {field: 'Country', header: 'Country'},
    {field: 'PrimaryEmail', header: 'Email'}];
  emailColumns = [
    {field: 'EmailAddress', header: 'Email'},
    {field: 'IsPrimary', header: 'Primary'},
    {field: 'IsVerified', header: 'Verified'}];
  phoneColumns = [
    {field: 'PhoneNumber', header: 'Number'},
    {field: 'CountryCode', header: 'CountryCode'}];
  youtubeColumns = [
    {field: 'ChannelName', header: 'Channel Name'},
    {field: 'LBRYChannelName', header: 'LBRY Channel'},
    {field: 'Subscribers', header: 'Subscribers'},
    {field: 'Videos', header: 'Videos'},
    {field: 'RewardAmount', header: 'Reward Amount'},
    {field: 'IsRedeemed', header: 'Redeemed'},
    {field: 'Status', header: 'Status'}];
  creditColumns = [
    {field: 'CreatedAt', header: 'Created'},
    {field: 'UpdatedAt', header: 'Updated'}];
  accessColumns = [
    {field: 'IP', header: 'IP'},
    {field: 'ISP', header: 'ISP'},
    {field: 'Country', header: 'Country'},
    // {field: 'Score', header: 'Score'},
    {field: 'AccessTime', header: 'Time'}];
  dupColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'IsRewardsApproved', header: 'Rewards Approved'},
    {field: 'PrimaryEmail', header: 'Primary Email'},
    {field: 'FirstIPMatch', header: 'First Matched IP'}];
  installColumns = [
    {field: 'Platform', header: 'Platform'},
    {field: 'DeviceType', header: 'Device'},
    {field: 'CreatedAt', header: 'Created'},
    {field: 'UpdatedAt', header: 'Updated'}];
  noteColumns = [
    {field: 'Note', header: 'Note'},
    {field: 'UpdatedAt', header: 'UpdatedAt'}];

  triggerFilter: string;
  showVerified: boolean;
  showAutoApprovals: boolean;
  verifiedUsers: User[] = [];

  static getVerificationMethod(user: User): string {
    if (user.CreditCards.length > 0 ) {
      return 'stripe';
    } else if ( user.Phones.length > 0 ) {
      return 'phone';
    } else if ( user.YoutubeChannels.length > 0 ) {
      return 'youtube';
    }
    return '';
  }

  constructor(public rest: RestService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.triggerFilter = localStorage.getItem('triggerFilter') ? localStorage.getItem('triggerFilter') : '';
    this.showVerified = localStorage.getItem('showVerified') ? localStorage.getItem('showVerified') === 'true' : false;
    this.loadPending();
    this.setUsers();
  }

  public loadPending() {
    this.pendingUsers = [];
    let params = new HttpParams();
    if ( this.triggerFilter.length > 0) {
      params = params.set('trigger_filter', this.triggerFilter);
      localStorage.setItem('triggerFilter', this.triggerFilter);
    } else {
      localStorage.setItem('triggerFilter', '');
    }
    if (this.showAutoApprovals) {
      params = params.set('auto_approved_only', String(this.showAutoApprovals));
    }
    this.rest.get('administrative', 'list_pending', params).subscribe((userResponse) => {
      userResponse.data.forEach((u) => {
        const user = new User();
        user.Duplicates = 0;
        user.UserID = u.user_id;
        user.GivenName = u.given_name;
        user.FamilyName = u.family_name;
        user.RewardStatusChangeTrigger = u.reward_status_change_trigger;
        // Emails
        if (u.emails) {
          u.emails.forEach((e) => {
            const email = new Email();
            email.EmailAddress = e.email;
            email.IsVerified = e.verified;
            email.IsPrimary = e.primary;
            if (email.IsPrimary) {
              user.PrimaryEmail = email.EmailAddress;
            }
            user.Emails = user.Emails.concat(email);
          });
        }
        // Phones
        if (u.phones) {
          u.phones.forEach((p) => {
            const phone = new Phone();
            phone.PhoneNumber = p.number;
            phone.CountryCode = p.country_code;
            user.Phones.push(phone);
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
            user.YoutubeChannels.push(ytChannel);
          });
        }
        // Credit Cards
        if (u.credit_cards) {
          u.credit_cards.forEach((c) => {
            const creditCard = new CreditCard();
            creditCard.CreadtedAt = new Date(c.created_at);
            creditCard.UpdatedAt = new Date(c.updated_at);
            user.CreditCards.push(creditCard);
          });
        }
        // Accesses
        if (u.accesses) {
          let match = true;
          const lastCounty = u.accesses[0].country;
          user.Country = lastCounty;
          u.accesses.forEach((a) => {
            const access = new Access();
            access.IP = a.ip;
            access.Country = a.country;
            access.Score = a.score;
            access.AccessTime = new Date(a.time);
            access.ISP = a.isp;
            user.Accesses.push(access);
            if (lastCounty !== access.Country) {
              match = false;
            }
          });
          user.LastAccessTime = new Date(u.last_access).toISOString();
          user.IsCountryMatch = match;
        }
        // Duplicate Accounts
        if (u.duplicate_accounts) {
          user.Duplicates = u.duplicate_accounts.length;
          u.duplicate_accounts.forEach((d) => {
            const duplicate = new DuplicateAccount();
            duplicate.UserID = d.user_id;
            duplicate.RewardStatusChangeTrigger = d.reward_status_change_trigger;
            duplicate.IsRewardsApproved = d.reward_enabled;
            duplicate.FirstIPMatch = d.first_ip_match;
            duplicate.PrimaryEmail = d.primary_email;
            user.DuplicateAccounts.push(duplicate);
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
            user.Installs.push(install);
          });
        }
        // Notes
        if (u.notes) {
          u.notes.forEach((n) => {
            const note = new Note();
            note.Note = n.note;
            note.UpdatedAt = new Date(n.updated_at);
            user.Notes.push(note);
            user.LastNote = note.Note;
          });
        }
        user.Verification = PendingComponent.getVerificationMethod(user);
        this.pendingUsers.push(user);
        if ( user.Verification.length > 0 ) {
          this.verifiedUsers.push(user);
        }
      });
    });
  }

  setUsers() {
    if ( this.showVerified ) {
      this.DisplayedUsers = this.verifiedUsers;
    } else {
      this.DisplayedUsers = this.pendingUsers;
    }
    localStorage.setItem('showVerified', this.showVerified.toString());
  }

  toggleAutoApprovals() {
    this.loadPending();
    this.setUsers();
  }


  approve(user: User) {
    const params = new HttpParams().
    set('id', user.UserID.toString()).
    set('comment', 'Commander Approved!').
    set('notify', true.toString()).
    set('is_reward_approved', 'yes');
    this.callUserApprove(user, params, 'Approved', 'User approved for rewards!');
  }

  dismiss(user: User) {
    const params = new HttpParams().
    set('id', user.UserID.toString()).
    set('comment', 'Commander - Auto ban confirmed!').
    set('is_reward_approved', 'no');
    this.callUserApprove(user, params, 'Dismissed', 'User auto rejection confirmed!');
  }

  callUserApprove(user: User, params: HttpParams, summary: string, detail: string) {
    this.rest.get('user', 'approve', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: summary, detail: detail});
        this.removeUser(user);
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

  removeUser(user: User) {

    const newPendingUsers = [];
    this.pendingUsers.forEach((u) => {
      if (u.UserID !== user.UserID) {
        newPendingUsers.push(u);
      }
    });
    this.pendingUsers = newPendingUsers;

    const newverifiedUsers = [];
    this.verifiedUsers.forEach((u) => {
      if (u.UserID !== user.UserID) {
        newverifiedUsers.push(u);
      }
    });
    this.verifiedUsers = newverifiedUsers;
    this.setUsers();
  }

  reject(user: User) {
    const params = new HttpParams().
    set('id', user.UserID.toString()).
    set('comment', 'Commander Rejected!').
    set('is_reward_approved', 'no');

    this.rest.get('user', 'approve', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Rejected', detail: 'User rejected for rewards!'});
        const newPendingUsers = [];
        this.pendingUsers.forEach((u) => {
          if (u.UserID !== user.UserID) {
            newPendingUsers.push(u);
          }
        });
        this.pendingUsers = newPendingUsers;
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

}
