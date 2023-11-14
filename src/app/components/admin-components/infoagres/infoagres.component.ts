import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-infoagres',
  templateUrl: './infoagres.component.html',
  styleUrls: ['./infoagres.component.scss']
})
export class InfoagresComponent {
  agremiados: any[] = [];
  generos: any[] = [];
  nues: any[] = [];
  cuotas: any[] = [];
  constructor(private user: AdminService, private theForm: FormBuilder) {
    this.showAgremiados();
    this.showGeneros();
    this.showNues();
    this.showCuotas();
    this.user.getAgremiadosObservable().subscribe(() => {
      this.showAgremiados();
    });
  }

  agrForm: FormGroup = this.theForm.group({
    a_paterno: ["", [Validators.required, Validators.maxLength(50)]],
    a_materno: ["", [Validators.required, Validators.maxLength(50)]],
    nombre: ["", [Validators.required, Validators.maxLength(50)]],
    genero: [null, Validators.required],
    nup: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    nue: [null, Validators.required],
    rfc: ["", [Validators.required, Validators.maxLength(13), Validators.minLength(13)]],
    nss: ["", [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    telefono: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    f_nacimiento: ["", Validators.required],
    cuota: [null, Validators.required],



  });

  validateInput(campo: string) {
    return this.agrForm.controls[campo].errors && this.agrForm.controls[campo].touched
  }


  saveInfo() {
    if (this.agrForm.valid) {

      const formData = new FormData();

      const data = this.agrForm.getRawValue();
      for (const dataKey in data) {
        formData.append(dataKey, data[dataKey]);
  
      }

      this.user.addAgremiado(formData).subscribe(
        (response) => {
          console.log('Peticion exitosa:', response);
          this.user.addAgremiadoSubject.next();
          this.goodNoti();
          // Restablecer el formulario después de enviar los datos
          this.agrForm.reset();
        },
        (error) => {
          console.error('Error al enviar datos al backend:', error);
          this.badNot();
          this.agrForm.reset();
        }
      );


    }
   
  }


  showAgremiados() {
    this.user.getAllAgreamiados().subscribe(
      (data: any) => {
        this.agremiados = data.agremiados;
        console.log('my data', this.agremiados);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  showGeneros() {
    this.user.getGeneros().subscribe(
      (data: any) => {
        this.generos = data.generos;
        console.log('generos', this.generos);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  showNues() {
    this.user.getNuesA().subscribe(
      (data: any) => {
        this.nues = data;
        console.log('nues', this.nues);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  showCuotas() {
    this.user.getCuotas().subscribe(
      (data: any) => {
        this.cuotas = data;
        console.log('cuotas', this.cuotas);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  goodNoti() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agremiado added successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong babe!'
    })
  }

}
