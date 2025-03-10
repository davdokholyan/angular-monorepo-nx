import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { RegistrationManagementService } from '../../../services';

export const step3Guard: CanActivateFn = () => {
  const regService = inject(RegistrationManagementService);
  const router = inject(Router);
  return regService.isStep2Complete()
    ? true
    : router.createUrlTree([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${UserRegistrationStepEnum.STEP_2}`]);
};
