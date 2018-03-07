import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';
import {AppRoutes} from './app.routes';
import {TopicService} from './shared/services/topic.service';
import {PostService} from './shared/services/post.service';
import {CommentService} from './shared/services/comment.service';
import {HttpClientModule} from '@angular/common/http';
import { NewTopicPageComponent } from './pages/new-topic-page/new-topic-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BoardIndexPageComponent,
    NewTopicPageComponent
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
    CommentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
