import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {BoardIndexPageComponent} from './pages/board-index-page/board-index-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardIndexPageComponent,
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
