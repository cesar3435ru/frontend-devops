import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const cpassword = control.get('cpassword')?.value;

    // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
    if ((password === cpassword) && (password !== null && cpassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }

}   