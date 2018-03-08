import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';
import {TopicEditPageComponent} from './pages/topic-edit-page/topic-edit-page.component';
import {TopicPageComponent} from './pages/topic-page/topic-page.component';
import {PostEditPageComponent} from './pages/post-edit-page/post-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardIndexPageComponent
  },
  {
    path: 'new-topic',
    component: TopicEditPageComponent
  },
  {
    path: 'topic/:id',
    component: TopicPageComponent
  },
  {
    path: 'topic/:id/edit',
    component: TopicEditPageComponent
  },
  {
    path: 'topic/:id/new-post',
    component: PostEditPageComponent
  },
  {
    path: 'topic/:topicId/post/:postId'
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
