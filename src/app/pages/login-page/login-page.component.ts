import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    }
  }


}
