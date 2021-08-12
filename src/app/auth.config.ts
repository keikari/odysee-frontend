import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://sso.odysee.com/auth/realms/Users',
  redirectUri: window.location.origin, // + '/index.html',
  logoutUrl: window.location.origin,
  clientId: 'commander',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  timeoutFactor: 0.01,
};
