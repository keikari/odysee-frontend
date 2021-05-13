import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {User} from './user-detail/model/user/user';
import {InvitedByList} from './model/invited-by-list.model';
import {PhoneCodesService} from '../services/phone-codes.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})

export class PendingComponent implements OnInit {
  DisplayedUsers: User[] = [];
  pendingUsers: User[] = [];
  verifiedUsers: User[] = [];
  UserColumns = [];
  triggerFilter: string;
  showVerified: boolean;
  showAutoApprovals: boolean;
  showTriggeredOnly: boolean;
  showOdyseeUsers: boolean;
  showOdyseeOnly: boolean;
  haveViews: boolean;
  approved: boolean;
  fastSearch: boolean;
  verificationMethod: string;
  invitedByFilter: number[] = [];
  invitedByLists: InvitedByList[] = [];
  selectedList: InvitedByList;
  countryCode: string = '';
  newIDs: string;
  lookback = 2;
  loading = false;
  codes: object;
  platforms = [];
  selectedPlatform: any;

  static getVerificationMethod(user: User): string {
    if (user.CreditCards.length > 0) {
      return 'stripe';
    } else if (user.Phones.length > 0) {
      const phones = [];
      user.Phones.forEach(p => {
        phones.push(p.Country);
      });
      return [...new Set(phones)].join(',');
    } else if (user.YoutubeChannels.length > 0) {
      return 'youtube';
    }
    return '';
  }

  constructor(public rest: ApiService, private phoneCodesService: PhoneCodesService) {
  }

  ngOnInit() {
    this.getInvitedByLists();
    this.triggerFilter = localStorage.getItem('triggerFilter') ? localStorage.getItem('triggerFilter') : '';
    this.showVerified = localStorage.getItem('showVerified') ? localStorage.getItem('showVerified') === 'true' : false;

    this.codes = JSON.parse(this.phoneCodesService.getCodes());
    this.platforms = [
      {platform: '', name: 'any platform'},
      {platform: 'ios', name: 'ios'},
      {platform: 'android', name: 'android'},
      {platform: 'linux', name: 'linux'},
      {platform: 'windows', name: 'windows'},
    ];
    this.selectedPlatform = this.platforms[0];
  }

  public loadPending() {
    this.pendingUsers = [];
    this.verifiedUsers = [];
    this.DisplayedUsers = [];
    let params = new HttpParams();
    this.loading = true;
    if (this.haveViews) {
      params = params.set('have_views', this.haveViews.toString());
    }
    if (this.approved) {
      params = params.set('is_approved_filter', this.approved.toString());
    }
    if (this.fastSearch) {
      params = params.set('order_by_update', this.fastSearch.toString());
    }
    if (this.triggerFilter.length > 0) {
      params = params.set('trigger_filter', this.triggerFilter);
      localStorage.setItem('triggerFilter', this.triggerFilter);
    } else {
      localStorage.setItem('triggerFilter', '');
    }
    if (this.showAutoApprovals) {
      params = params.set('auto_approved_only', String(this.showAutoApprovals));
    }
    if (this.selectedPlatform.platform) {
      params = params.set('platform', this.selectedPlatform.platform);
    }
    if (this.showTriggeredOnly) {
      params = params.set('triggered_only', String(this.showTriggeredOnly));
    }
    if (this.showOdyseeOnly) {
      params = params.set('odysee_users_only', String(this.showOdyseeOnly));
    }
    if (this.showOdyseeUsers) {
      params = params.set('odysee_users', String(this.showOdyseeUsers));
    }
    if (this.verificationMethod.length > 0 && this.verificationMethod !== 'all') {
      params = params.set('verification_method', this.verificationMethod);
    }
    if (this.countryCode.length > 0 && this.verificationMethod === 'phone' && this.codes[this.countryCode]) {
      params = params.set('country_code', this.codes[this.countryCode]);
      console.log(this.codes[this.countryCode]);
    }
    if (this.invitedByFilter.length > 0) {
      params = params.set('invited_by_filter', this.invitedByFilter.toString());
      localStorage.setItem('invited_by_filter', this.invitedByFilter.toString());
    }
    params = params.set('look_back_days', this.lookback.toString());
    this.rest.get('administrative', 'list_pending', params).subscribe((userResponse) => {
      this.loading = false;
      userResponse.data.forEach((u) => {
        const user = new User(u);
        user.Verification = PendingComponent.getVerificationMethod(user);
        if (this.verificationMethod === 'phone' || this.verificationMethod === 'stripe') {
          if (!user.YoutubeChannels.length) {
            this.pendingUsers.push(user);
          }
        } else {
          this.pendingUsers.push(user);
        }
        if (user.Verification.length > 0) {
          this.verifiedUsers.push(user);
        }
      });
      this.pendingUsers = this.pendingUsers.reverse();
      this.verifiedUsers = this.verifiedUsers.reverse();
    });
    this.setUsers();

  }

  setUsers() {
    this.DisplayedUsers = [];
    if (this.showVerified) {
      this.DisplayedUsers = this.verifiedUsers;
    } else {
      this.DisplayedUsers = this.pendingUsers;
    }
    localStorage.setItem('showVerified', this.showVerified.toString());
  }

  onRowSelect(event) {
    this.invitedByFilter = this.selectedList.UserIDs;
  }

  getInvitedByLists() {
    this.invitedByLists = JSON.parse(localStorage.getItem('invitedByLists'));
    if (this.invitedByLists == null) {
      this.invitedByLists = [];
    }
  }

  setInvitedByLists() {
    localStorage.setItem('invitedByLists', JSON.stringify(this.invitedByLists));
  }

  createNew() {
    const stringUserIDs = this.newIDs.split(',');
    const intUserIDs = [];
    stringUserIDs.forEach(value => intUserIDs.push(parseInt(value, 10)));
    this.invitedByLists.push({Name: 'Click To Edit Name', UserIDs: intUserIDs});
  }

  deleteList(list) {
    this.invitedByLists = this.invitedByLists.filter(value => value.UserIDs !== list.UserIDs);
  }

  setUserColumns(method: string) {
    if (method === 'youtube') {
      this.UserColumns = [
        {field: 'UserID', header: 'UserID', width: '30px'},
        {field: 'RewardApproved', header: 'Rewards', width: '15px'},
        {field: 'Duplicates', header: 'Dups', width: '15px'},
        {field: 'RewardStatusChangeTrigger', header: 'Trigger', width: '15px'},
        {field: 'Countries', header: 'Country', width: '15px'},
        {field: 'PrimaryEmail', header: 'Email', width: '15px'},
        {field: 'YTChannelsAmount', header: 'YT Channels Amount', width: '5px'},
        {field: 'YoutubeChannelName', header: 'Channel', width: '15px'},
        {field: 'Status', header: 'Status', width: '5px'},
        {field: 'Subscribers', header: 'Subs', width: '10px'},
        {field: 'Videos', header: 'Videos', width: '10px'},
        {field: 'Views', header: 'Views', width: '10px'},
        {field: 'ISPs', header: 'ISPs', width: '10px'},
        {header: 'YTAction', width: '15px'}
      ];
    } else {
      this.UserColumns = [
        {field: 'UserID', header: 'UserID', width: '30px'},
        {field: 'Duplicates', header: 'Duplicates', width: '15px'},
        {field: 'Verification', header: 'Verification', width: '15px'},
        {field: 'RewardStatusChangeTrigger', header: 'Trigger', width: '30px'},
        {field: 'LastAccessTime', header: 'Last Access', width: '15px'},
        {field: 'IsCountryMatch', header: 'Country Match', width: '15px'},
        {field: 'Countries', header: 'Countries', width: '15px'},
        {field: 'ISPs', header: 'ISPs', width: '15px'},
        {field: 'PrimaryEmail', header: 'Email', width: '15px'}];
    }

  }
}
