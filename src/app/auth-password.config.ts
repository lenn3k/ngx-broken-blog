import {AuthConfig} from 'angular-oauth2-oidc';

export const authPasswordFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9080/auth/realms/brokenblog',
  redirectUri: window.location.origin + '/',
  clientId: 'web_app',
  scope: 'openid profile email',
  // disable in prod env
  showDebugInformation: true,
  oidc: false
};
