import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { RegistrationManagementService } from '../../../../services';

@Component({
  selector: 'app-step3',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step3Component {
  private regService = inject(RegistrationManagementService);

  aboutUsControl = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  constructor() {
    this.initializeControl();
  }

  private initializeControl(): void {
    const savedData = this.regService.step3Data();
    if (savedData) {
      this.aboutUsControl.setValue(savedData.aboutUs);
    }
  }

  onBack(): void {
    this.regService.changeRoute([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${UserRegistrationStepEnum.STEP_2}`]);
  }

  onSubmit(): void {
    if (this.aboutUsControl.invalid) {
      this.aboutUsControl.markAsTouched();
      return;
    }

    this.regService.completeStep3({ aboutUs: this.aboutUsControl.getRawValue() });
    this.regService.clearDataAndLogin()
  }
}
