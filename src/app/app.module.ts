import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardIndexPageComponent } from './pages/board-index-page/board-index-page.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    BoardIndexPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
