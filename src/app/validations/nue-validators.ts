import { AbstractControl, ValidationErrors } from "@angular/forms";
export class NueValidators {
    static patronNue(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const pattern = /^[A-Z0-9]{8}$/;
      
        if (!pattern.test(value)) {
          return { alfanumerico8: true, message: 'El campo debe contener 8 caracteres alfanuméricos (letras mayúsculas y números).' };
        }
      
        return null;
      }
      


}