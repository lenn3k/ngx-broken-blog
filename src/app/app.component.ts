import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  currentDate: Date = new Date();

  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 30000);
  }

  get givenName() {
    return 'derp';
  }

  loggedIn() {
    return false;
  }

  login() {
  }

  logout() {
  }

  goToRegister() {
    // TODO go to keycloak register page
  }
}
