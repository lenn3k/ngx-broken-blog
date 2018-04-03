import { Component, OnInit, OnDestroy } from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  currentDate: Date = new Date();

  constructor(private oauthService: OAuthService) {
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.clientId = environment.keycloak.clientId;
    this.oauthService.scope = 'openid profile email';
    this.oauthService.issuer = environment.keycloak.url;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin();
    });
    setInterval(() => {
      this.currentDate = new Date();
    }, 30000);
  }



  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  goToRegisterPage(): void {
    window.location.href = environment.keycloak.registration + environment.keycloak.clientId;
  }
  loggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

}
