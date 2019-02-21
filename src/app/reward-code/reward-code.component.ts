import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-reward-code',
  templateUrl: './reward-code.component.html',
  styleUrls: ['./reward-code.component.css']
})
export class RewardCodeComponent implements OnInit {
  title = '';
  amount = '';
  code = '';
  quantity = '';
  maxUses = '';
  platformOptions = [{name: 'Mobile', value: 'mobile'}, {name: 'Desktop', value: 'desktop'}];
  platform: any;
  versionConstraint = '';

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
  }

  createCode($event: any) {
    let params = new HttpParams().
    set('title', this.title).
    set('amount', this.amount).
    set('quantity', this.quantity).
    set('max_uses', this.maxUses);

    if ( this.maxUses !== '') {
      params = params.set('code', this.code);
    }

    if ( this.maxUses !== '') {
      params = params.set('max_uses', this.maxUses);
    }

    if ( this.platform && this.platform.value !== '') {
      params = params.set('platform', this.platform.value);
    }

    if ( this.versionConstraint !== '') {
      params = params.set('app_version_constraint', this.versionConstraint);
    }

    this.rest.get('reward_code', 'new', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.data});
      }
    });
  }
}
