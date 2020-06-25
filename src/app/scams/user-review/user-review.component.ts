import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user-detail/model/user/user';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  @Input() users: User[] = [];
  approvedItems: MenuItem[];
  rejectItems: MenuItem[];
  display = false;
  approved = false;
  message = '';
  splitButtonUser: User;
  userColumns = [
    {field: 'UserID', header: 'UserID'},
    {field: 'Duplicates', header: 'Duplicates', width: '13px'},
    {field: 'Verification', header: 'Verification'},
    {field: 'RewardStatusChangeTrigger', header: 'Trigger'},
    {field: 'LastAccessTime', header: 'Last Access'},
    {field: 'IsCountryMatch', header: 'Country Match'},
    {field: 'Country', header: 'Country'},
    {field: 'PrimaryEmail', header: 'Email'}];

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.approvedItems = [
      {label: 'Custom Message', icon: 'pi pi-refresh', command: () => {
          this.display = true;
          this.approved = true;
        }},
    ];
    this.rejectItems = [
      {label: 'Custom Message', icon: 'pi pi-refresh', command: () => {
          this.display = true;
          this.approved = false;
        }},
    ];
  }

  approve(user: User) {
    let params = new HttpParams().
    set('id', user.UserID.toString()).
    set('notify', true.toString()).
    set('comment', 'Commander Approved!').
    set('is_reward_approved', 'yes');
    if ( this.message !== '') {
      params = params.set('comment', this.message);
    }
    this.callUserApprove(user, params, 'Approved', 'User approved for rewards!');
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
    let params = new HttpParams().
    set('id', user.UserID.toString()).
    set('comment', 'Commander - Auto ban confirmed!').
    set('is_reward_approved', 'no');
    if ( this.message !== '') {
      params = params.set('comment', this.message);
    }
    this.callUserApprove(user, params, 'Dismissed', 'User auto rejection confirmed!');
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
    if ( this.approved ) {
      this.approve(this.splitButtonUser);
    } else {
      this.dismiss(this.splitButtonUser);
    }
    this.message = '';
  }

  setSplitButtonUser(user: User) {
    this.splitButtonUser = user;
  }

}
