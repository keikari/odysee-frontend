import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../user-detail/model/user/user';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {ConfirmationService} from 'primeng/api';
import {MenuItem, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {YtChannel} from "../../yt-queue/model/yt-channel.model";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() crud = false;
  @Input() userColumns = [
    {field: 'UserID', header: 'UserID', width: '30px'},
    {field: 'Duplicates', header: 'Duplicates', width: '15px'},
    {field: 'Verification', header: 'Verification', width: '15px'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger', width: '30px'},
    {field: 'LastAccessTime', header: 'Last Access', width: '15px'},
    {field: 'IsCountryMatch', header: 'Country Match', width: '15px'},
    {field: 'Countries', header: 'Countries', width: '15px'},
    {field: 'ISPs', header: 'ISPs', width: '15px'},
    {field: 'PrimaryEmail', header: 'Email', width: '15px'}];
  selectedUsers: User[] = [];
  @ViewChild('dt') table: Table;
  approvedItems: MenuItem[];
  rejectItems: MenuItem[];
  sortItems: MenuItem[];
  display = false;
  approved = false;
  isOrdered = false;
  message = '';
  splitButtonUser: User = null;

  _selectedColumns: any[];

  constructor(public rest: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.approvedItems = [
      {
        label: 'Custom Message', icon: 'pi pi-refresh', command: () => {
          this.display = true;
          this.approved = true;
        }
      },
    ];
    this.rejectItems = [
      {
        label: 'Custom Message', icon: 'pi pi-refresh', command: () => {
          this.display = true;
          this.approved = false;
        }
      },
    ];
    this.sortItems = [
      {
        label: 'Order By YT Subs', icon: 'pi pi-sort', command: () => {
          this.OrderByChannelsSubs();
        }
      },
      {
        label: 'Order By YT Ratio', icon: 'pi pi-sort', command: () => {
          this.OrderByChannelsRatio();
        }
      },
      {
        label: 'Oldest First', icon: 'pi pi-sort', command: () => {
          this.OrderByUserID();
        }
      },
    ];
  }

  approve(user: User) {
    let params = new HttpParams().set('id', user.UserID.toString()).set('notify', true.toString()).set('comment', 'Commander Approved!')
      .set('is_reward_approved', 'yes');
    if (this.message !== '') {
      params = params.set('comment', this.message);
    }
    this.callUserApprove(user, params, 'Approved', 'User approved for rewards!');
    this.message = '';
    this.splitButtonUser = null;
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
    const newUsers = [];
    this.users.forEach((u) => {
      if (u.UserID !== user.UserID) {
        newUsers.push(u);
      }
    });
    this.users = newUsers;
  }

  dismiss(user: User) {
    let params = new HttpParams().set('id', user.UserID.toString()).set('comment', 'Commander - Auto ban confirmed!')
      .set('is_reward_approved', 'no');
    if (this.message !== '') {
      params = params.set('comment', this.message);
    }
    this.callUserApprove(user, params, 'Dismissed', 'User auto rejection confirmed!');
    this.message = '';
    this.splitButtonUser = null;
  }

  reject(user: User) {
    const newUsers = [];
    this.users.forEach((u) => {
      if (u.UserID !== user.UserID) {
        newUsers.push(u);
      }
    });
    this.users = newUsers;
  }

  done() {
    this.display = false;
    if (this.splitButtonUser != null) {
      if (this.approved) {
        this.approve(this.splitButtonUser);
      } else {
        this.dismiss(this.splitButtonUser);
      }
    } else {
      this.updateSelectedUsersRewardsStatus(this.approved);
    }
  }

  setSplitButtonUser(user: User) {
    this.splitButtonUser = user;
  }

  confirmDeletion(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(user);
      },
      reject: () => {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Rejected', detail: 'You just saived the life'});
      }
    });
  }

  deleteUser(user: User) {
    const params = new HttpParams().set('user_id', user.UserID.toString());
    this.rest.get('administrative', 'delete_user', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'User have been deleted'});
        this.removeUser(user);
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

  onDuplicatesChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const duplicates = parseInt(value, 10);

      if (!isNaN(duplicates)) {
        this.table.filter(duplicates, 'Duplicates', 'lte');
      }
    }
  }

  updateSelectedUsersRewardsStatus(isRewardsSatisfy) {
    const rewardStatus = isRewardsSatisfy ? 'yes' : 'no';
    const message = isRewardsSatisfy ? 'Approved!' : 'Rejected!';
    const details = isRewardsSatisfy ? 'User approved for rewards!' : 'User auto rejection confirmed!';
    const comment = isRewardsSatisfy ? 'Commander Approved!' : 'Commander Rejected';
    const question = isRewardsSatisfy ? 'approve' : 'reject';
    const customMessage = this.message;
    this.confirmationService.confirm({
      message: `Are you sure you want to ${question} all selected users?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedUsers.forEach((user) => {
          let params = new HttpParams().set('id', user.UserID.toString()).set('notify', true.toString()).set('comment', comment)
            .set('is_reward_approved', rewardStatus);
          if (customMessage !== '') {
            params = params.set('comment', customMessage);
          }
          this.callUserApprove(user, params, message, details);
        });
        this.message = '';
      }
    });
  }

  OrderByUserID() {
    this.users = this.users.sort((a, b) => a.UserID <= b.UserID ? -1 : 1);
  }

  OrderByChannelsRatio() {
    this.users.forEach(function (part, index) {
      this[index].YoutubeChannels = part.YoutubeChannels.sort((a, b) => a.Ratio >= b.Ratio ? -1 : 1);
      this[index].YoutubeChannels = part.YoutubeChannels.sort((a, b) => Number(a.Reviewed) - Number(b.Reviewed));
    }, this.users);
    this.users = this.users.sort((a, b) => a.YoutubeChannels[0].Ratio >= b.YoutubeChannels[0].Ratio ? -1 : 1);
  }

  OrderByChannelsSubs() {
    this.users.forEach(function (part, index) {
      this[index].YoutubeChannels = part.YoutubeChannels.sort((a, b) => a.Subscribers > b.Subscribers ? -1 : 1);
      this[index].YoutubeChannels = part.YoutubeChannels.sort((a, b) => Number(a.Reviewed) - Number(b.Reviewed));
    }, this.users);
    this.users = this.users.sort((a, b) => a.YoutubeChannels[0].Subscribers >= b.YoutubeChannels[0].Subscribers ? -1 : 1);
  }

  hideYouTubers() {
    this.users = this.users.filter(user => user.YoutubeChannels.length === 0);
  }

  // param came from column.api_field
  changeFieldStatus(YtChannelID: string, param: string, event) {
    const params = new HttpParams().set('channel_id', YtChannelID).set(param, event.checked.toString());
    this.rest.get('yt', 'disapprove', params).subscribe(response => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Channel updated!'});
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

  approveChannel(YtChannelID: string) {
    this.changeFieldStatus(YtChannelID, 'should_sync', {checked: false});
    this.changeFieldStatus(YtChannelID, 'reviewed', {checked: false});
    setTimeout(() => {
      this.changeFieldStatus(YtChannelID, 'should_sync', {checked: true});
    }, 1000);
    setTimeout(() => {
      this.changeFieldStatus(YtChannelID, 'reviewed', {checked: true});
    }, 2000);
  }

  rejectChannel(YtChannelID: string) {
    this.changeFieldStatus(YtChannelID, 'should_sync', {checked: true});
    this.changeFieldStatus(YtChannelID, 'reviewed', {checked: false});
    setTimeout(() => {
      this.changeFieldStatus(YtChannelID, 'should_sync', {checked: false});
    }, 1000);
    setTimeout(() => {
      this.changeFieldStatus(YtChannelID, 'reviewed', {checked: true});
    }, 2000);
  }
}
