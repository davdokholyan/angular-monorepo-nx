import { Routes } from '@angular/router';
import { RouteEnum } from '@core/models/enums';

export const layoutRoutes: Routes = [
  { path: '', redirectTo: RouteEnum.DASHBOARD, pathMatch: 'full' },
  {
    path: RouteEnum.DASHBOARD,
    title: 'Dashboard',
    loadComponent: () => import('../pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: RouteEnum.DASHBOARD,
  },
];
