import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';
import {User} from './user-detail/model/user/user';
import {Email} from './user-detail/model/email/email';
import {Phone} from './user-detail/model/phone/phone';
import {YoutubeChannel} from './user-detail/model/youtube_channel/youtube-channel';
import {CreditCard} from './user-detail/model/credit_card/credit-card';
import {Access} from './user-detail/model/access/access';
import {DuplicateAccount} from './user-detail/model/duplicate_account/duplicate-account';
import {Install} from './user-detail/model/install/install';
import {Note} from './user-detail/model/note/note';
import {Inviter} from './user-detail/model/inviter/inviter';
import {RedeemedReward} from './user-detail/model/redeemed-reward/redeemed-reward';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  DisplayedUsers: User[] = [];
  pendingUsers: User[] = [];
  verifiedUsers: User[] = [];

  triggerFilter: string;
  showVerified: boolean;
  showAutoApprovals: boolean;
  showTriggeredOnly: boolean;
  verificationMethod = 'all';
  invitedByFilter: bigint;

  static getVerificationMethod(user: User): string {
    if (user.CreditCards.length > 0 ) {
      return 'stripe';
    } else if ( user.Phones.length > 0 ) {
      return 'phone';
    } else if ( user.YoutubeChannels.length > 0 ) {
      return 'youtube';
    }
    return '';
  }

  constructor(public rest: RestService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.triggerFilter = localStorage.getItem('triggerFilter') ? localStorage.getItem('triggerFilter') : '';
    this.showVerified = localStorage.getItem('showVerified') ? localStorage.getItem('showVerified') === 'true' : false;
    this.loadPending();
  }

  public loadPending() {
    this.pendingUsers = [];
    this.verifiedUsers = [];
    this.DisplayedUsers = [];
    let params = new HttpParams();
    if ( this.triggerFilter.length > 0) {
      params = params.set('trigger_filter', this.triggerFilter);
      localStorage.setItem('triggerFilter', this.triggerFilter);
    } else {
      localStorage.setItem('triggerFilter', '');
    }
    if (this.showAutoApprovals) {
      params = params.set('auto_approved_only', String(this.showAutoApprovals));
    }
    if (this.showTriggeredOnly) {
      params = params.set('triggered_only', String(this.showTriggeredOnly));
    }
    if (this.verificationMethod.length > 0 && this.verificationMethod !== 'all') {
      params = params.set('verification_method', this.verificationMethod);
    }
    if ( this.invitedByFilter > 0 ) {
      params = params.set('invited_by_filter', this.invitedByFilter.toString());
      localStorage.setItem('invited_by_filter', this.invitedByFilter.toString());
    }
    this.rest.get('administrative', 'list_pending', params).subscribe((userResponse) => {
      userResponse.data.forEach((u) => {
        const user = new User(u);
        user.Verification = PendingComponent.getVerificationMethod(user);
        this.pendingUsers.push(user);
        if ( user.Verification.length > 0 ) {
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
    if ( this.showVerified ) {
      this.DisplayedUsers = this.verifiedUsers;
    } else {
      this.DisplayedUsers = this.pendingUsers;
    }
    localStorage.setItem('showVerified', this.showVerified.toString());
  }

  toggleAutoApprovals() {
    this.loadPending();
  }

  toggleTriggeredOnly() {
    this.loadPending();
  }

}
