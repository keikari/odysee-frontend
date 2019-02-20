import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  identityVerificationOn: boolean;
  rewardsEnabled: boolean;

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
    this.rest.get('flag', 'list', new HttpParams()).subscribe((response: any) => {
      if (response !== undefined) {
        this.identityVerificationOn = response.data.identity_verification_enabled;
        this.rewardsEnabled = response.data.rewards_enabled;
      }
    });
  }

  rewardsChange(checked: boolean) {
    const params = new HttpParams().
    set('name', 'rewards_enabled').
    set('value', checked.toString() );
    this.rest.get('flag', 'set', params );
  }
}
