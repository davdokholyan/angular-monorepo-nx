import { FormControl } from '@angular/forms';
import { Nullable } from '@core/models/interfaces/nullable';
import { IndustryEnum } from '../enums/industry.enum';
import { RoleEnum } from '../enums/role.enum';

export type Step1FormData = {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export type Step2FormData = {
  industry: FormControl<Nullable<IndustryEnum>>;
  experienceInYear: FormControl<number>;
  yourRole: FormControl<Nullable<RoleEnum>>;
}

export type Step3FormData = {
  aboutUs: FormControl<string>;
}
