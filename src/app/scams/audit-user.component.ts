import {Component, OnInit} from '@angular/core';
import {User} from './user-detail/model/user/user';
import {ApiService} from '../services/api.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-audit-user',
  templateUrl: './audit-user.component.html',
  styleUrls: ['./audit-user.component.css']
})
export class AuditUserComponent implements OnInit {

  users: User[] = [];
  searchValue = '';
  searchKey = '';
  paramsSub: Subscription;
  loading = false;
  searchOptions: any[];

  constructor(public rest: ApiService, private messageService: MessageService, private activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.searchOptions = [
      {label: 'User ID', value: 'user_id'},
      {label: 'Email', value: 'email'},
      {label: 'ClaimID', value: 'claim_id'},
      {label: 'YTChannelID', value: 'yt_channel_id'}
    ];
    this.paramsSub = this.activatedroute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.searchValue = params.get('id');
        this.searchKey = 'user_id';
        this.loadAudit();
      }
    });
  }

  loadAudit() {
    this.users = [];
    let params = new HttpParams();

    if (this.searchValue.length > 0) {
      params = params.set(this.searchKey, this.searchValue);
    }
    this.loading = true;
    this.rest.get('administrative', 'audit_user', params).subscribe((userResponse) => {
      this.loading = false;
      userResponse.data.forEach((u) => {
        const user = new User(u);
        this.users.push(user);
      });
    });

  }
}
