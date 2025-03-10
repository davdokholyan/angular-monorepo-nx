import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const emailPattern = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

export class FormValidators extends Validators {
  static emailValidator(control: AbstractControl<string, string>): null | ValidationErrors {
    if (FormValidators.required(control) !== null) {
      return null;
    }

    return emailPattern.test(control.value.trim()) ? null : { email: true };
  }

  static isMismatch(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl<string | null>): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const password = control.parent.get(passwordControlName)?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { isMismatch: true };
    };
  }

  static numberRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl<number | null>): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === undefined) {
        return null;
      }

      if (isNaN(value) || value < min || value > max) {
        return { numberRange: { min, max, actual: value } };
      }

      return null;
    };
  }
}
