import {Component} from '@angular/core';
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

  get givenName() {
    return 'derp';
  }

  loggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  login() {
  }

  logout() {
  }

  goToRegister() {
    // TODO go to keycloak register page
  }
}
