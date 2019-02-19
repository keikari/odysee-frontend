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

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.authenticate(this.token);
    }
    this.items = [
      {
        label: 'File',
        items: [
          {label: 'Terminal', icon: 'fa fa-terminal', routerLink: ['/terminal']}
        ]
      },
      {
        label: 'Templates', routerLink: ['/template']
      },
      {
        label: 'User',
        items: [
          {label: 'Approve', icon: 'pi pi-fw pi-trash', routerLink: ['/user/approve']},
          {label: 'Merge', icon: 'pi pi-fw pi-refresh', routerLink: ['/user/merge']},
          {label: 'Invite', icon: 'pi pi-fw pi-refresh', routerLink: ['/user/invite']}
        ]
      },
      {
        label: 'Tag',
        items: [
          {label: 'Tag User', icon: 'pi pi-fw pi-trash', routerLink: ['/tag/user']},
          {label: 'Tag File', icon: 'pi pi-fw pi-refresh', routerLink: ['/tag/file']}
        ]
      }
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
}
