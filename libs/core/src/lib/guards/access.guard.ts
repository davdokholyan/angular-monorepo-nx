import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouteEnum } from '@core/models/enums';

export const accessGuard = (requiresAuth: boolean): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = authService.isAuthenticated();

    if (requiresAuth && !isAuthenticated) {
      return router.createUrlTree([`/${RouteEnum.AUTH}`]);
    }

    if (!requiresAuth && isAuthenticated) {
      return router.createUrlTree([`/${RouteEnum.DASHBOARD}`]);
    }

    return true;
  };
};
