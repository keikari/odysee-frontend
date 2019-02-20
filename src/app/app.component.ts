import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { RestService } from './rest.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';




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
          {label: 'Tag File', routerLink: ['/tag/file']}
        ]
      },
      {
        label: 'Templates', routerLink: ['/template']
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
}
