import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { RegistrationManagementService } from '../../../services';

export const step2Guard: CanActivateFn = () => {
  const regService = inject(RegistrationManagementService);
  const router = inject(Router);
  return regService.isStep1Complete()
    ? true
    : router.createUrlTree([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${UserRegistrationStepEnum.STEP_1}`]);
};
