import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { UserRegistrationStepEnum } from '@core/models/enums';
import { step2Guard, step3Guard } from './guards';

export const registrationRoutes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      { path: '', redirectTo: UserRegistrationStepEnum.STEP_1, pathMatch: 'full' },
      {
        path: UserRegistrationStepEnum.STEP_1,
        title: 'Step 1',
        loadComponent: () => import('./components/step1/step1.component').then(c => c.Step1Component),
      },
      {
        path: UserRegistrationStepEnum.STEP_2,
        title: 'Step 2',
        canActivate: [step2Guard],
        loadComponent: () => import('./components/step2/step2.component').then(c => c.Step2Component),
      },
      {
        path: UserRegistrationStepEnum.STEP_3,
        title: 'Step 3',
        canActivate: [step3Guard],
        loadComponent: () => import('./components/step3/step3.component').then(c => c.Step3Component),
      }
    ],
  },
];
