import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';
import {authPasswordFlowConfig} from '../../auth-password.config';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userName: string;
  password: string;
  loginFailed = false;
  userProfile: object;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private oAuthService: OAuthService,
              private router: Router) {
    // use password flow for login page
    this.oAuthService.configure(authPasswordFlowConfig);
    this.oAuthService.loadDiscoveryDocument();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginUsername: ['', Validators.required],
      loginPassword: ['', Validators.required],
      loginRemember: false
    });
    this.isLoggedIn();
  }

  isLoggedIn(): void {
    if (this.oAuthService.hasValidAccessToken()) {
      this.router.navigate(['/']);
    }
  }

  loadUserProfile(): void {
    this.oAuthService.loadUserProfile()
      .then(up => this.userProfile = up);
  }
  get givenName() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    let claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  loginWithPass() {
    this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName , this.password)
      .then(() => {
        console.debug('login success!');
        this.loginFailed = false;
      })
      .catch((err) => {
        console.error('login error: ' + err);
        this.loginFailed = true;
      });
  }

  logout(){
    this.oAuthService.logOut(true);
  }
}
