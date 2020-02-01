import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { RestService } from './rest.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(public rest: RestService, private messageService: MessageService, private router: Router, ) { }
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
    const apiUrl = localStorage.getItem('api_url');
    if (apiUrl !== '') {
      this.customAPIEnabled = true;
      this.customAPI = apiUrl;
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
        label: 'Codes', routerLink: ['/rewardcode']
      },
      {
        label: 'Homepage', routerLink: ['/homepage']
      },
      {
        label: 'Terminal', routerLink: ['/terminal']
      },
      {
        label: 'Admin',
        items: [
          {label: 'Pending', routerLink: ['/admin/pending']},
          {label: 'Audit', routerLink: ['/admin/audit']},
          {label: 'Country Codes', routerLink: ['/admin/countrycodes']},
        ]
      },
      {
        label: 'Notifications', routerLink: ['/notifications']
      },
    ];
  }

  authenticate(token: string) {
    this.rest.authenticate(this.token).subscribe((response: any) => {
      this.isAuthenticated = response !== undefined;
    });
  }

  login() {
    localStorage.setItem('token', this.token);
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
    if ( !this.customAPIEnabled ) {
      this.rest.setEndpoint(this.defaultAPI);
      localStorage.removeItem('api_url');
    } else {
      this.rest.setEndpoint(this.customAPI);
      localStorage.setItem('api_url', this.customAPI);
    }
  }

  toggleCustomAPI(checked: boolean) {
    this.customAPIEnabled = checked;
    if (!this.customAPIEnabled) {
      this.customAPI = '';
      this.rest.setEndpoint(this.defaultAPI);
    }
  }

  goToStats() {
    this.router.navigate(['/status']);
  }
}
