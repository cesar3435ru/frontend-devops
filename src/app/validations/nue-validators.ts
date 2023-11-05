import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class NueValidators {
  static patronNue: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const nue = control?.get('nue')?.value;
    const pattern = /^[A-Z0-9]{10}$/;
    if (!pattern.test(nue)) {
      return { alfanum: true };
    }
    return null;
  }
}
