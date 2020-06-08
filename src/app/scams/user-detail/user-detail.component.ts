import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {User} from './model/user/user';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';
import {YoutubeChannel} from './model/youtube_channel/youtube-channel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Output() userReject: EventEmitter<User> = new EventEmitter();
  @Input() DisplayedUser: User;
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
    {field: 'Status', header: 'Status'},
    {field: 'RewardAmount', header: 'Reward Amount'},
    {field: 'IsRedeemed', header: 'Redeemed'},
    {field: 'IsRedeemable', header: 'Redeemable'},
    {field: 'ShouldSync', header: 'ShouldSync'},
    {field: 'Action', header: 'Action'}];
  creditColumns = [
    {field: 'CreatedAt', header: 'Created'},
    {field: 'UpdatedAt', header: 'Updated'}];
  accessColumns = [
    {field: 'IP', header: 'IP'},
    {field: 'ISP', header: 'ISP'},
    {field: 'Country', header: 'Country'},
    {field: 'Score', header: 'Score'},
    {field: 'AccessTime', header: 'Time'}];
  redeemedRewardColumns = [
    {field: 'Type', header: 'Type'},
    {field: 'Amount', header: 'Amount'},
    {field: 'CreatedAt', header: 'Created At'},
    {field: 'Platform', header: 'Platform'},
    {field: 'TransactionID', header: 'TransactionID'}];
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
  inviterColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'PrimaryEmail', header: 'Email'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'RewardEnabled', header: 'Rewards Enabled'},
    {field: 'IsEmailVerified', header: 'Verified'},
    {field: 'TotalRedeemedRewards', header: 'Redeemed Rewards'},
    {field: 'InvitedUsers', header: 'Invited Users'},
    {field: 'InviteRewards', header: 'Invite Rewards'},
  ];
  ownedChannelsColumns = [
    {field: 'URI', header: 'URI'},
    {field: 'SignedStreams', header: 'Signed Streams'},
  ];
  invitedUsersColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'PrimaryEmail', header: 'Email'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'RewardEnabled', header: 'Rewards Enabled'},
    {field: 'IsEmailVerified', header: 'Verified'},
    {field: 'TotalRedeemedRewards', header: 'Redeemed Rewards'},
  ];

  constructor(public rest: RestService, private messageService: MessageService) {
  }

  ngOnInit() {
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
        this.userReject.emit(user);
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

  changeEvent(channel: YoutubeChannel) {
    channel.ApplyDisabled = false;
  }

  rejectChannel(channel: YoutubeChannel) {
    const params = new HttpParams().
    set('channel_id', channel.ChannelID.toString()).
    set('should_sync', channel.ShouldSync.toString()).
    set('should_email', channel.ShouldEmail.toString()).
    set('redeemable', channel.IsRedeemable.toString());

    this.rest.get('yt', 'disapprove', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Channel edited!'});
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }
}
