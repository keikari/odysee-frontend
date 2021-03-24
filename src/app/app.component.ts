import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ApiService} from './services/api.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(public rest: ApiService, private messageService: MessageService, private router: Router) {
  }

  title = 'app';
  isAuthenticated = false;
  items: MenuItem[];
  token: string;
  settingsVisible: boolean;
  defaultAPI = environment.apiurl;
  customAPI = '';
  customAPIEnabled = false;

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.customAPI = localStorage.getItem('api_url');
    this.customAPIEnabled = localStorage.getItem('api_enabled') === 'true';
    if (this.customAPIEnabled) {
      this.rest.setEndpoint(this.customAPI);
    }
    if (this.token) {
      this.authenticate(this.token);
    }
    this.items = [
      {
        label: 'User',
        items: [
          {label: 'Approve', routerLink: ['/user/approve']},
          {label: 'Merge', routerLink: ['/user/merge']},
          {label: 'Invite', routerLink: ['/user/invite']}
        ]
      },
      {
        label: 'Tag',
        items: [
          {label: 'Tag User', routerLink: ['/tag/user']},
          {label: 'Tag File', routerLink: ['/tag/file']},
          {label: 'Tag Claim', routerLink: ['/tag/channel']},
        ]
      },
      {
        label: 'Templates',
        items: [
          {label: 'Send Templates', routerLink: ['/templates/send']},
          {label: 'SQL Templates', routerLink: ['/templates/sql']},
        ]
      },
      {
        label: 'Codes', routerLink: ['/reward-code']
      },
      {
        label: 'Homepage', routerLink: ['/homepage']
      },
      {
        label: 'Retention', routerLink: ['/retention']
      },
      {
        label: 'Admin',
        items: [
          {label: 'Pending', routerLink: ['/admin/pending']},
          {label: 'Audit', routerLink: ['/admin/audit']},
          {label: 'Country Codes', routerLink: ['/admin/country-codes']},
          {label: 'Verifications', routerLink: ['/admin/verification']},
          {label: 'YouTube Queue', routerLink: ['/admin/yt-queue']},
        ]
      },
      {
        label: 'Notifications', routerLink: ['/notifications']
      },
      {
        label: 'Channel-Factor', routerLink: ['/channel-factor']
      },
      {
        label: 'Reports', routerLink: ['/reports']
      },
      {
        label: 'Search', routerLink: ['/search']
      },
    ];
  }

  authenticate(token: string) {
    this.token = token;
    this.rest.authenticate(this.token).subscribe((response: any) => {
      this.isAuthenticated = response && response.data && response.data.groups &&
          response.data.groups.length > 0 &&
          ( response.data.groups.includes('admin') || response.data.groups.includes('mod') );
      if ( !this.isAuthenticated ) {
        this.messageService.add({
          severity: 'error',
          summary: 'User is not in authorized group to access commander',
          detail: response.error});
      }
    });
  }

  login() {
    localStorage.setItem('token', this.token);
    this.setCustomAPIHost();
    this.authenticate(this.token);
  }

  logout() {
    localStorage.setItem('token', undefined);
    this.isAuthenticated = false;
  }

  showSettings() {
    this.settingsVisible = true;
  }

  setCustomAPIHost() {
    if (!this.customAPIEnabled) {
      console.log('removing api url');
      this.rest.setEndpoint(this.defaultAPI);
      localStorage.removeItem('api_url');
    } else {
      this.rest.setEndpoint(this.customAPI);
      localStorage.setItem('api_url', this.customAPI);
      console.log('setting api url');
    }
  }

  toggleCustomAPI(checked: boolean) {
    console.log('checked:', checked);
    if (!checked) {
      this.customAPI = '';
      this.rest.setEndpoint(this.defaultAPI);
      localStorage.setItem('api_enabled', 'false');
    } else {
      localStorage.setItem('api_enabled', 'true');
    }
  }

  goToStats() {
    this.router.navigate(['/status']);
  }
}
