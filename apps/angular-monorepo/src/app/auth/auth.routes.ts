import { Routes } from '@angular/router';
import { RouteEnum } from '@core/models/enums';

export const authRoutes: Routes = [
  { path: '', redirectTo: RouteEnum.REGISTRATION, pathMatch: 'full' },
  {
    path: RouteEnum.REGISTRATION,
    title: 'Registration',
    loadChildren: () => import('./registration/registration.routes')
      .then(r => r.registrationRoutes)
  },
  {
    path: '**',
    redirectTo: RouteEnum.REGISTRATION,
  },
];
