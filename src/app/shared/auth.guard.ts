import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate() {
    if (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    ) {
      console.log('Id Claims:', this.oauthService.getIdentityClaims());
      console.log('Access Claims:', this.oauthService.getAccessToken());
      return true;
    } else {
      this.router.navigate(['/']); // , { login: true }]);
      return false;
    }
  }
}
