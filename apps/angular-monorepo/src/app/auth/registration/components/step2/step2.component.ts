import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidators } from '@core/utilities';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { EnumValuePipe } from '@shared/pipes';
import {
  IndustryEnum,
  RoleEnum,
  RouteEnum,
  UserRegistrationStepEnum,
} from '@core/models/enums';
import { RegistrationManagementService } from '../../../../services';
import { IStep2Data, Step2FormData } from '@core/models/interfaces';

@Component({
  selector: 'app-step2',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardActions,
    MatOption,
    MatSelect,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    EnumValuePipe,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step2Component {
  private regService = inject(RegistrationManagementService);

  IndustryEnum = IndustryEnum;
  RoleEnum = RoleEnum;

  form = new FormGroup<Step2FormData>({
    industry: new FormControl(null, Validators.required),
    experienceInYear: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, FormValidators.numberRange(0, 50)],
    }),
    yourRole: new FormControl(null, Validators.required),
  });

  constructor() {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();
    this.regService.completeStep2(data as IStep2Data);
    this.regService.changeRoute([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${UserRegistrationStepEnum.STEP_3}`]);
  }

  private initializeForm(): void {
    const savedData = this.regService.step2Data();

    if (savedData) {
      this.form.patchValue(savedData);
    }
  }
}
