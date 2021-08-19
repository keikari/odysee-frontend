import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ApiService} from './services/api.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {HttpParams} from '@angular/common/http';
import {VerifyService} from './services/verify.service';
import {ReportService} from './services/report.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth.config';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(public rest: ApiService,
              private oauthService: OAuthService,
              private messageService: MessageService,
              private verifyService: VerifyService,
              private reportService: ReportService,
              private router: Router,
              private activatedroute: ActivatedRoute) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setupAutomaticSilentRefresh();

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => { this.hasToken = true; this.oauthService.loadUserProfile(); });
  }

  title = 'app';
  isAuthenticated = false;
  hasToken = false;
  items: MenuItem[];
  token: string;
  settingsVisible: boolean;
  defaultAPI = environment.apiurl;
  customAPI = '';
  customAPIEnabled = false;

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      if (params.has('code') && !this.hasToken) {
        console.log('Has param CODE');
        this.oauthService.loadDiscoveryDocumentAndLogin();
      }
    });
    this.customAPI = localStorage.getItem('api_url');
    this.customAPIEnabled = localStorage.getItem('api_enabled') === 'true';
    if (this.customAPIEnabled) {
      this.rest.setEndpoint(this.customAPI);
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
    if (this.oauthService.hasValidAccessToken()) {
      this.authenticate();
    }
  }

  authenticate() {
    this.authVerify();
    this.authReports();
    this.rest.authenticate(null).subscribe((response: any) => {
      const authenticated = response && response.data && response.data.groups &&
        response.data.groups.length > 0 &&
        (response.data.groups.includes('admin') || response.data.groups.includes('mod'));
      if (!authenticated) {
        this.messageService.add({
          severity: 'error',
          summary: 'User is not in authorized group to access commander',
          detail: response.error
        });
      } else {
        this.isAuthenticated = authenticated;
      }
    });
  }

  authVerify() {
    this.rest.get('auth', 'verify', new HttpParams()).subscribe((response: any) => {
      if ( response && response.success && response.data) {
        this.verifyService.setToken(response.data);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'User is not in authorized group to access verify service',
          detail: response.error});
      }
    });
  }

  authReports() {
    this.rest.get('auth', 'rick', new HttpParams()).subscribe((response: any) => {
      if ( response && response.success && response.data) {
        this.reportService.setToken(response.data);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'User is not in authorized group to access verify service',
          detail: response.error});
      }
    });
  }

  isSignedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  async signin() {
    await this.oauthService.loadDiscoveryDocumentAndLogin();
    this.hasToken = this.oauthService.hasValidAccessToken();
  }

  login() {
    this.setCustomAPIHost();
    this.authenticate();
  }

  async logout() {
    if (this.oauthService.hasValidAccessToken()) {
      await this.oauthService.revokeTokenAndLogout();
    }
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
