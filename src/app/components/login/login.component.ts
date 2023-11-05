import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NueValidators } from 'src/app/validations/nue-validators';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private theForm: FormBuilder, private rou: Router) { }


  ngOnInit(): void {
  }
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong!'
    })
  }


  loginForm: FormGroup = this.theForm.group({
    nue: ["", [Validators.required, Validators.maxLength(10)]],
    password: ["", [Validators.required, Validators.minLength(10)]]
  },
    { validators: NueValidators.patronNue }
  )

  validInput(input: string) {
    const control = this.loginForm.get(input);
  
    if (!control) {
      return false; // El control no existe
    }
  
    if (control.touched && control.errors) {
      if (control.errors['required']) {
        return true; // El campo es requerido y ha sido tocado
      }
  
      if (control.errors['minlength']) {
        return true; // El campo es demasiado corto y ha sido tocado
      }
      if (control.errors['maxlength']) {
        return true; // El campo es demasiado corto y ha sido tocado
      }
    }
  
    return false; // No hay errores de validación o el control no ha sido tocado
  }
  


  startLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.goodNot();
      this.loginForm.reset();
    }
  }


  downloadFormatos() {
    const pdfFileName = 'formatos.docx';
    const pdfFilePath = 'assets/downloads/' + pdfFileName;
    // Crear un enlace <a> en el DOM
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = pdfFileName;
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }

  downloadConvocatoria() {
    const pdfFileName = 'convocatoria.pdf';
    const pdfFilePath = 'assets/downloads/' + pdfFileName;
    // Crear un enlace <a> en el DOM
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = pdfFileName;
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }


}
