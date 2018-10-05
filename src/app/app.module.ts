import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';
import {AppRoutes} from './app.routes';
import {TopicService} from './shared/services/topic.service';
import {PostService} from './shared/services/post.service';
import {HttpClientModule} from '@angular/common/http';
import {TopicEditPageComponent} from './pages/topic-edit-page/topic-edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TopicPageComponent} from './pages/topic-page/topic-page.component';
import {PostEditPageComponent} from './pages/post-edit-page/post-edit-page.component';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardIndexPageComponent,
    TopicEditPageComponent,
    TopicPageComponent,
    PostEditPageComponent,
    PostPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TopicService,
    PostService,
    // TODO provide authGuard here
    // TODO provide interceptor here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
