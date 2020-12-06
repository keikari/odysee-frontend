import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { User } from './model/user/user';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { TagService } from '../../services/tag.service'
import { YoutubeChannel } from './model/youtube_channel/youtube-channel';
import { Tag } from './model/tag/tag';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Output() userReject: EventEmitter<User> = new EventEmitter();
  @Input() DisplayedUser: User;
  userColumns = [
    { field: 'UserID', header: 'UserID' },
    { field: 'Duplicates', header: 'Duplicates', width: '13px' },
    { field: 'Verification', header: 'Verification' },
    { field: 'RewardStatusChangeTrigger', header: 'Trigger' },
    { field: 'LastAccessTime', header: 'Last Access' },
    { field: 'IsCountryMatch', header: 'Country Match' },
    { field: 'Country', header: 'Country' },
    { field: 'PrimaryEmail', header: 'Email' }];
  emailColumns = [
    { field: 'EmailAddress', header: 'Email' },
    { field: 'IsPrimary', header: 'Primary' },
    { field: 'IsVerified', header: 'Verified' }];
  phoneColumns = [
    { field: 'PhoneNumber', header: 'Number' },
    { field: 'Country', header: 'Country' }];
  youtubeColumns = [
    { field: 'ChannelName', header: 'Channel Name' },
    { field: 'LBRYChannelName', header: 'LBRY Channel' },
    { field: 'Subscribers', header: 'Subscribers' },
    { field: 'Videos', header: 'Videos' },
    { field: 'Status', header: 'Status' },
    { field: 'RewardAmount', header: 'Reward Amount' },
    { field: 'IsRedeemed', header: 'Redeemed' },
    { field: 'IsRedeemable', header: 'Redeemable', api_field: 'redeemable' },
    { field: 'ShouldSync', header: 'ShouldSync', api_field: 'should_sync' },
    { field: 'Reviewed', header: 'Reviewed', api_field: 'reviewed' }];
  creditColumns = [
    { field: 'CreatedAt', header: 'Created' },
    { field: 'UpdatedAt', header: 'Updated' }];
  accessColumns = [
    { field: 'IP', header: 'IP' },
    { field: 'ISP', header: 'ISP' },
    { field: 'Country', header: 'Country' },
    { field: 'Score', header: 'Score' },
    { field: 'AccessTime', header: 'Time' }];
  redeemedRewardColumns = [
    { field: 'Type', header: 'Type' },
    { field: 'Amount', header: 'Amount' },
    { field: 'CreatedAt', header: 'Created At' },
    { field: 'Platform', header: 'Platform' },
    { field: 'TransactionID', header: 'TransactionID' }];
  dupColumns = [
    { field: 'UserID', header: 'UserID' },
    { field: 'RewardStatusChangeTrigger', header: 'Trigger' },
    { field: 'IsRewardsApproved', header: 'Rewards Approved' },
    { field: 'PrimaryEmail', header: 'Primary Email' },
    { field: 'FirstIPMatch', header: 'First Matched IP' },
    { field: 'CreatedAt', header: 'Created at' }];
  installColumns = [
    { field: 'Platform', header: 'Platform' },
    { field: 'DeviceType', header: 'Device' },
    { field: 'CreatedAt', header: 'Created' },
    { field: 'UpdatedAt', header: 'Updated' },
    { field: 'Domain', header: 'Domain' }];
  noteColumns = [
    { field: 'Note', header: 'Note' },
    { field: 'UpdatedAt', header: 'UpdatedAt' },
    { field: 'CommenterEmail', header: 'Changed by' }];
  inviterColumns = [
    { field: 'UserID', header: 'UserID' },
    { field: 'PrimaryEmail', header: 'Email' },
    { field: 'RewardStatusChangeTrigger', header: 'Trigger' },
    { field: 'RewardEnabled', header: 'Rewards Enabled' },
    { field: 'IsEmailVerified', header: 'Verified' },
    { field: 'TotalRedeemedRewards', header: 'Redeemed Rewards' },
    { field: 'InvitedUsers', header: 'Invited Users' },
    { field: 'InviteRewards', header: 'Invite Rewards' },
  ];
  ownedChannelsColumns = [
    { field: 'URI', header: 'URI' },
    { field: 'SignedStreams', header: 'Signed Streams' },
    { field: 'ViewRateFactor', header: 'View Rate Factor' }
  ];
  invitedUsersColumns = [
    { field: 'UserID', header: 'UserID' },
    { field: 'PrimaryEmail', header: 'Email' },
    { field: 'RewardStatusChangeTrigger', header: 'Trigger' },
    { field: 'RewardEnabled', header: 'Rewards Enabled' },
    { field: 'IsEmailVerified', header: 'Verified' },
    { field: 'TotalRedeemedRewards', header: 'Redeemed Rewards' },
  ];
  selectedTag: any;
  tagOptions: any[] = [];
  comment = '';

  constructor(public rest: ApiService, private messageService: MessageService, private tagService: TagService) {
  }

  ngOnInit() {
  }
  LoadUserData(user: User, dataType: string) {
    this.loadTagsDescription();
    switch (dataType) {
      case 'rewards':
        if (this.DisplayedUser.RedeemedRewards.length === 0) {
          const params = new HttpParams().
          set('user_id', user.UserID.toString()).
          set('rewards', 'true');
          this.rest.get('administrative', 'load_user_data', params).subscribe((response) => {
            if (response && response.error) {
              this.messageService.clear();
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            } else if (response && response.data) {
              this.DisplayedUser.RedeemedRewards = [];
              response.data.forEach(reward => {
                this.DisplayedUser.RedeemedRewards.push({
                  'Type': reward.type,
                  'Amount': reward.amount,
                  'CreatedAt': reward.created_at,
                  'Platform': reward.platform,
                  'TransactionID': reward.transaction_id
                });
              });
            }
          });
        }
        break;
      case 'tags':
        if (this.DisplayedUser.Tags.length === 0) {
          const params = new HttpParams().
          set('user_id', user.UserID.toString()).
          set('tags', 'true');
          this.rest.get('administrative', 'load_user_data', params).subscribe((response) => {
            if (response && response.error) {
              this.messageService.clear();
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            } else if (response && response.data) {
              response.data.forEach(tag => this.DisplayedUser.Tags.push({
                'Name': tag.name,
                'Id': tag.id,
                'IsRemoved': tag.is_removed,
              }));
            }
          });
        }
        break;
      case 'invited_users':
        if (this.DisplayedUser.InvitedUsers.length === 0) {
          const params = new HttpParams().
          set('user_id', user.UserID.toString()).
          set('invited_users', 'true');
          this.rest.get('administrative', 'load_user_data', params).subscribe((response) => {
            if (response && response.error) {
              this.messageService.clear();
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            } else if (response && response.data) {
              response.data.forEach(user => this.DisplayedUser.InvitedUsers.push({
                'UserID' : user.user_id,
                'IsEmailVerified' : user.is_email_verified,
                'PrimaryEmail' : user.primary_email,
                'RewardEnabled' : user.reward_enabled,
                'RewardStatusChangeTrigger' : user.reward_status_change_trigger,
                'TotalRedeemedRewards' : user.total_redeemed_rewards,
                'IsYouTuber' : user.is_youtuber
              }));
            }
          });
        }
      break;
    }
  }

  loadTagsDescription() {
    if (this.tagOptions.length === 0 ) {
      this.tagService.getTags().subscribe(response => {
        if (response !== undefined) {
          response.data.forEach((tag) => {
            this.tagOptions = this.tagOptions.concat({ name: tag.name, value: tag.name });
            this.DisplayedUser.Tags.forEach((userTag) => {
              if (userTag.Id == tag.id) {
                userTag.Name = tag.name;
              }
            })
          });
          this.selectedTag = this.tagOptions[0];
        }
      });
    }
  }

  reject(user: User) {
    const params = new HttpParams().
      set('id', user.UserID.toString()).
      set('comment', 'Commander Rejected!').
      set('is_reward_approved', 'no');

    this.rest.get('user', 'approve', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'User rejected for rewards!' });
        this.userReject.emit(user);
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'No Response Data?', detail: '' });
      }
    });
  }

  // param came from column.api_field
  changeFieldStatus(channel: YoutubeChannel, param: string, event) {
    const params = new HttpParams().
      set('channel_id', channel.ChannelID.toString()).
      set(param, event.checked.toString());
    this.rest.get('yt', 'disapprove', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Changed', detail: 'Channel edited!' });
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'No Response Data?', detail: '' });
      }
    });
  }

  changeTagStatus(id: bigint, tag: Tag) {
    const changedStatus = !tag.IsRemoved;
    for (let i = 0; i < this.DisplayedUser.Tags.length; i++) {
      if (this.DisplayedUser.Tags[i].Id === tag.Id) {
        this.DisplayedUser.Tags[i].IsRemoved = changedStatus;
      }
    }
    this.tagUser(tag.Name, id, changedStatus);
  }

  tagUser(tag: string, id: bigint, status: boolean) {
    this.tagService.tagUser(tag, id.toString(), status).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1) });
      }
    });
  }

  setFactor(url: string, factor: number) {
    const claimId = url.slice(-40);
    const params = new HttpParams().
      set('channel_claim_id', claimId).
      set('factor', factor.toString());
    this.rest.get('creator', 'set_factor', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1) });
      }
    });
  }
}
