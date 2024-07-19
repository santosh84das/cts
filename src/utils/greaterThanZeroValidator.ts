import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && value !== undefined && value <= 0) {
        return { greaterThanZero: true };
      }
      return null;
    };
  }