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
  disabled = true;

  ngOnInit() {
    this.token = localStorage.getItem('token');
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
          {label: 'Country Codes', routerLink: ['/admin/countrycodes']},
        ]
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
    if ( this.disabled ) {
      this.rest.setEndpoint(this.defaultAPI);
    } else {
      this.rest.setEndpoint(this.customAPI);
    }
  }

  setChecked() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.customAPI = '';
      this.rest.setEndpoint(this.defaultAPI);
    }
  }

  goToStats() {
    this.router.navigate(['/status']);
  }
}
