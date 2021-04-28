import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {User} from './model/user/user';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';
import {TagService} from '../../services/tag.service';
import {YoutubeChannel} from './model/youtube_channel/youtube-channel';
import {Tag} from './model/tag/tag';
import {RedeemedReward} from './model/redeemed-reward/redeemed-reward';
import {InvitedUser} from './model/invited-user/invited-user';
import {FollowedUser} from './model/followed_user/followed-user';
import {FileView} from './model/file-view/file-view';
import {LazyLoadService} from "../../services/lazy-load.service";
import {DuplicateAccount} from "./model/duplicate_account/duplicate-account";

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
    {field: 'Country', header: 'Country'}];
  youtubeColumns = [
    {field: 'ChannelName', header: 'Channel Name'},
    {field: 'LBRYChannelName', header: 'LBRY Channel'},
    {field: 'Subscribers', header: 'Subscribers'},
    {field: 'Videos', header: 'Videos'},
    {field: 'Views', header: 'Views'},
    {field: 'Suggestion', header: 'Suggestion'},
    {field: 'Status', header: 'Status'},
    {field: 'RewardAmount', header: 'Reward Amount'},
    {field: 'IsRedeemed', header: 'Redeemed'},
    {field: 'IsRedeemable', header: 'Redeemable', api_field: 'redeemable'},
    {field: 'ShouldSync', header: 'ShouldSync', api_field: 'should_sync'},
    {field: 'Reviewed', header: 'Reviewed', api_field: 'reviewed'}];
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
    {field: 'FirstIPMatch', header: 'First Matched IP'},
    {field: 'CreatedAt', header: 'Created at'}];
  installColumns = [
    {field: 'Platform', header: 'Platform'},
    {field: 'DeviceType', header: 'Device'},
    {field: 'CreatedAt', header: 'Created'},
    {field: 'UpdatedAt', header: 'Updated'},
    {field: 'Domain', header: 'Domain'}];
  noteColumns = [
    {field: 'Note', header: 'Note'},
    {field: 'UpdatedAt', header: 'UpdatedAt'},
    {field: 'CommenterEmail', header: 'Changed by'}];
  viewsColumns = [
    {field: 'URI', header: 'URI'},
    {field: 'ViewedAt', header: 'ViewedAt'},
  ];
  inviterColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'PrimaryEmail', header: 'Email'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'IsRewardsApproved', header: 'Rewards Enabled'},
    {field: 'IsEmailVerified', header: 'Verified'},
    {field: 'TotalRedeemedRewards', header: 'Redeemed Rewards'},
    {field: 'InvitedUsers', header: 'Invited Users'},
    {field: 'InviteRewards', header: 'Invite Rewards'},
  ];
  ownedChannelsColumns = [
    {field: 'URI', header: 'URI'},
    {field: 'SignedStreams', header: 'Signed Streams'},
    {field: 'ViewRateFactor', header: 'View Rate Factor'}
  ];
  invitedUsersColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'PrimaryEmail', header: 'Email'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'IsRewardsApproved', header: 'Rewards Enabled'},
    {field: 'IsEmailVerified', header: 'Verified'},
    {field: 'RedeemedRewards', header: 'Redeemed Rewards'},
  ];
  FollowersColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'PrimaryEmail', header: 'Email'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'IsRewardsApproved', header: 'Rewards Enabled'},
    {field: 'IsEmailVerified', header: 'Verified'},
    {field: 'RedeemedRewards', header: 'Redeemed Rewards'},
    {field: 'SharedFollowers', header: 'Total Shared Followers'},
  ];
  selectedTag: any;
  tagOptions: any[] = [];
  comment = '';

  constructor(public rest: ApiService, private messageService: MessageService, private tagService: TagService, private lazyService: LazyLoadService) {
  }

  ngOnInit() {
  }


  loadTagsDescription() {
    if (this.tagOptions.length === 0) {
      this.tagService.getTags().subscribe(response => {
        if (response !== undefined) {
          response.data.forEach((tag) => {
            this.tagOptions = this.tagOptions.concat({name: tag.name, value: tag.name});
            this.DisplayedUser.Tags.forEach((userTag) => {
              if (userTag.Id === tag.id) {
                userTag.Name = tag.name;
              }
            });
          });
          this.selectedTag = this.tagOptions[0];
        }
      });
    }
  }

  LoadUserRewards(user: User) {
    if (this.DisplayedUser.RedeemedRewards.length === 0) {
      this.lazyService.getRewards(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Rewards loaded!'});
          this.DisplayedUser.RedeemedRewards = [];
          response.data.forEach(r => {
            const reward = new RedeemedReward(
              r.type,
              r.amount,
              r.created_at,
              r.platform,
              r.transaction_id,
            );
            this.DisplayedUser.RedeemedRewards.push(reward);
          });
        }
      });
    }
  }

  LoadUserTags(user: User) {
    if (this.DisplayedUser.Tags.length === 0) {
      this.loadTagsDescription();
      this.lazyService.getTags(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Tags loaded!'});
          response.data.forEach(t => {
            const tag = new Tag(
              t.id,
              t.is_removed,
              t.name,
            );
            this.DisplayedUser.Tags.push(tag);
          });
        }
      });
    }
  }

  LoadUsersInvited(user: User) {
    if (this.DisplayedUser.InvitedUsers.length === 0) {
      this.lazyService.getInvitedUsers(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Invited users Loaded!'});
          response.data.forEach(u => {
            const invitedUser = new InvitedUser(
              u.user_id,
              u.primary_email,
              u.reward_status_change_trigger,
              u.reward_enabled,
              u.is_youtuber,
              u.is_email_verified,
              u.total_redeemed_rewards,
            );
            this.DisplayedUser.InvitedUsers.push(invitedUser);
          });
        }
      });
    }
  }


  LoadFollowXFollow(user: User) {
    if (this.DisplayedUser.FollowedUsers.length === 0) {
      this.lazyService.getFollowxFollow(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Followers loaded!'});
          response.data.forEach(u => {
            const fUser = new FollowedUser(
              u.user_id,
              u.primary_email,
              u.reward_status_change_trigger,
              u.reward_enabled,
              u.is_youtuber,
              u.is_email_verified,
              u.total_redeemed_rewards,
              u.shared_followers,
            );
            this.DisplayedUser.FollowedUsers.push(fUser);
          });
        }
      });
    }
  }

  LoadDuplicates(user: User) {
    if (this.DisplayedUser.DuplicateAccounts.length === 0) {
      this.lazyService.getDuplicates(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Invited users Loaded!'});
          response.data.forEach(d => {
            const dUser = new DuplicateAccount(
              d.user_id,
              d.primary_email,
              d.reward_status_change_trigger,
              d.reward_enabled,
              d.is_youtuber,
              d.first_ip_match,
              d.created_at,
            );
            this.DisplayedUser.DuplicateAccounts.push(dUser);
          });
        }
      });
    }
  }
  LoadFileViews(user: User) {
    if (this.DisplayedUser.FileViews.length === 0) {
      this.lazyService.getViews(user.UserID).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.data) {
          this.messageService.clear();
          this.messageService.add({severity: 'success', summary: 'Loaded', detail: 'Views loaded!'});
          response.data.forEach(view => this.DisplayedUser.FileViews.push(new FileView(view.uri, view.last_time_viewed)));
        }
      });
    }
  }

  reject(user: User) {
    const params = new HttpParams().set('id', user.UserID.toString()).set('comment', 'Commander Rejected!').set('is_reward_approved', 'no');

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

  // param came from column.api_field
  changeFieldStatus(channel: YoutubeChannel, param: string, event) {
    const params = new HttpParams().set('channel_id', channel.ChannelID.toString()).set(param, event.checked.toString());
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: JSON.stringify(response.data, null, 1)
        });
      }
    });
  }

  setFactor(url: string, factor: number) {
    const claimId = url.slice(-40);
    const params = new HttpParams().set('channel_claim_id', claimId).set('factor', factor.toString());
    this.rest.get('creator', 'set_factor', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: JSON.stringify(response.data, null, 1)
        });
      }
    });
  }

  getRewardColor(user: any) {
    if (user.IsRewardsApproved) {
      return {
        'background-color': '#8bff86'
      };
    }
    if (!user.IsRewardsApproved) {
      return {
        'background-color': '#ffab99'
      };
    }
  }
}
