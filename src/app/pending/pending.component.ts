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

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  PendingUsers: User[] = [];
  userColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'Duplicates', header: 'Duplicates', width: '13px'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'LastAccessTime', header: 'Last Access'},
    {field: 'IsCountryMatch', header: 'Country Match'},
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
    {field: 'Country', header: 'Country'},
    {field: 'Score', header: 'Score'},
    {field: 'AccessTime', header: 'Time'}];
  dupColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'RewardsStatusChangeTrigger', header: 'Trigger'},
    {field: 'IsRewardsApproved', header: 'Rewards Approved'}];
  installColumns = [
    {field: 'Platform', header: 'Platform'},
    {field: 'DeviceType', header: 'Device'},
    {field: 'CreatedAt', header: 'Created'},
    {field: 'UpdatedAt', header: 'Updated'}];

  constructor(public rest: RestService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadPending();
  }

  private loadPending() {
    this.PendingUsers = [];
    this.rest.get('administrative', 'list_pending', new HttpParams()).subscribe((userResponse) => {
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
            if(email.IsPrimary) {
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
          let latestAccess = new Date(u.accesses[0].time);
          u.accesses.forEach((a) => {
            const access = new Access();
            access.IP = a.ip;
            access.Country = a.country;
            access.Score = a.score;
            access.AccessTime = new Date(a.time);
            user.Accesses.push(access);
            if (lastCounty !== access.Country) {
              match = false;
            }
            if (latestAccess < access.AccessTime) {
              latestAccess = access.AccessTime;
            }
          });
          user.LastAccessTime = latestAccess;
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
        // this.PendingUsers = this.PendingUsers.concat(user);
        this.PendingUsers.push(user);
      });
      this.PendingUsers.sort(
        (a: User, b: User) => (a.LastAccessTime < b.LastAccessTime) ? 1 : ((b.LastAccessTime < a.LastAccessTime) ? -1 : 0));
    });
  }


  log(val) { console.log(val); }

  approve(user: User) {

    const params = new HttpParams().
    set('user_id', user.UserID.toString()).
    set('comment', 'Commander').
    set('is_reward_approved', 'yes');

    this.rest.get('user', 'approve', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Approved', detail: 'User approved for rewards!'});
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

}
