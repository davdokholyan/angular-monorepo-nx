import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidators } from '@core/utilities';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RegistrationManagementService } from '../../../../services';
import { Step1FormData } from '@core/models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step1',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardHeader,
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component {
  private regService = inject(RegistrationManagementService);

  form = new FormGroup<Step1FormData>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.emailValidator],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, FormValidators.isMismatch('password')],
    }),
  });

  constructor() {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();
    this.regService.completeStep1(data);
    this.regService.changeRoute([`${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${UserRegistrationStepEnum.STEP_2}`]);
  }

  private initializeForm(): void {
    const savedData = this.regService.step1Data();
    if (savedData) {
      this.form.patchValue({
        email: savedData.email,
        password: savedData.password,
        confirmPassword: savedData.password,
      });
    }
  }
}
