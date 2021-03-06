import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  currentDate: Date = new Date();

  constructor(){
    setInterval(() => {
      this.currentDate = new Date();
    }, 30000);
  }
}
