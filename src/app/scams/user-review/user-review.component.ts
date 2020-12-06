import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../user-detail/model/user/user';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { ConfirmationService } from 'primeng/api';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() crud: boolean = false;
  selectedUsers: User[] = [];
  @ViewChild('dt') table: Table;
  approvedItems: MenuItem[];
  rejectItems: MenuItem[];
  display = false;
  approved = false;
  message = '';
  splitButtonUser: User = null;
  userColumns = [
    { field: 'UserID', header: 'UserID' },
    { field: 'Duplicates', header: 'Duplicates', width: '13px' },
    { field: 'Verification', header: 'Verification' },
    { field: 'RewardStatusChangeTrigger', header: 'Trigger' },
    { field: 'LastAccessTime', header: 'Last Access' },
    { field: 'IsCountryMatch', header: 'Country Match' },
    { field: 'Country', header: 'Country' },
    { field: 'PrimaryEmail', header: 'Email' }];

  constructor(public rest: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
  }

  approve(user: User) {
    let params = new HttpParams().
      set('id', user.UserID.toString()).
      set('notify', true.toString()).
      set('comment', 'Commander Approved!').
      set('is_reward_approved', 'yes');
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: summary, detail: detail });
        this.removeUser(user);
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'No Response Data?', detail: '' });
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
    let params = new HttpParams().
      set('id', user.UserID.toString()).
      set('comment', 'Commander - Auto ban confirmed!').
      set('is_reward_approved', 'no');
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
        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'You just saived the life' });
      }
    });
  }
  deleteUser(user: User) {
    const params = new HttpParams().
      set('user_id', user.UserID.toString());
    this.rest.get('administrative', 'delete_user', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User have been deleted' });
        this.removeUser(user);
      } else {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'No Response Data?', detail: '' });
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
          let params = new HttpParams().
            set('id', user.UserID.toString()).
            set('notify', true.toString()).
            set('comment', comment).
            set('is_reward_approved', rewardStatus);
          if (customMessage !== '') {
            params = params.set('comment', customMessage);
          }
          this.callUserApprove(user, params, message, details);
        });
        this.message = '';
      }
    });
  }
}
