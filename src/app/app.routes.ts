import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';
import {NewTopicPageComponent} from './pages/new-topic-page/new-topic-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardIndexPageComponent
  },
  {
    path: 'new-topic',
    component: NewTopicPageComponent
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
