import { Route } from '@angular/router';
import { RouteEnum } from '@core/models/enums';
import { authGuard } from '@core/guards/auth.guard';
import { accessGuard } from '@core/guards/access.guard';

export const appRoutes: Route[] = [
  {
    path: RouteEnum.AUTH,
    canActivate: [accessGuard(false)],
    loadChildren: () => import('./auth/auth.routes').then(r => r.authRoutes),
  },
  {
    path: '',
    canActivate: [authGuard, accessGuard(true)],
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    loadChildren: () => import('./layout/layout.routes').then(r => r.layoutRoutes),
  },
  { path: '**', redirectTo: '' },
];
