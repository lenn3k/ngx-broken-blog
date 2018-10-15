import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';
import {authPasswordFlowConfig} from '../../auth-password.config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private oAuthService: OAuthService,
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


  }

  login() {
    if (this.loginForm.valid) {
      const formRaw = this.loginForm.getRawValue();
      const username = formRaw['loginUsername'];
      const password = formRaw['loginPassword'];

      // Do something with username and password
      this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)
        .then(value => {
          console.log('login success!');
          console.log(value);
          this.router.navigate(['/']);
        })
        .catch(reason => {
          console.log('login failed :(');
          console.log(reason.error);
        });
    }
  }


}
