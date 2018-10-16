import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';
import {TopicEditPageComponent} from './pages/topic-edit-page/topic-edit-page.component';
import {TopicPageComponent} from './pages/topic-page/topic-page.component';
import {PostEditPageComponent} from './pages/post-edit-page/post-edit-page.component';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BoardIndexPageComponent
  },
  {
    path: 'new-topic',
    component: TopicEditPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'topic/:id',
    component: TopicPageComponent
  },
  {
    path: 'topic/:id/edit',
    component: TopicEditPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'topic/:id/new-post',
    component: PostEditPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'topic/:topicId/post/:postId',
    component: PostPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
