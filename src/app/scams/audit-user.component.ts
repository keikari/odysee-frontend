import { Component, OnInit } from '@angular/core';
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
  userID = 0;
  userEmail = '';
  paramsSub: Subscription;
  loading = false;

  constructor(public rest: ApiService, private messageService: MessageService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub  = this.activatedroute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.userID = Number(params.get('id'));
        this.loadAudit();
      }
    });
  }

  loadAudit() {
    this.users = [];
    let params = new HttpParams();
    if (this.userID > 0) {
      params = params.set('user_id', this.userID.toString());
    }
    if (this.userEmail.length > 0) {
      params = params.set('email', this.userEmail);
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

  clearUserID() {
    this.userID = 0;
  }
}
