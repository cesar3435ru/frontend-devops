import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ainfoedit',
  templateUrl: './ainfoedit.component.html',
  styleUrls: ['./ainfoedit.component.scss']
})
export class AinfoeditComponent {

  generos: any[] = [];
  nues: any[] = [];
  cuotas: any[] = [];
  selectedGender: any;
  selectedNue: any;
  selectedCuota: any;
  id_a: any;
  agre_data: any = {};

  constructor(private user: AdminService, private theForm: FormBuilder, private rou: Router, private ActR: ActivatedRoute) {
    this.showGeneros();
    this.showNues();
    this.showCuotas();
    const id = parseInt(this.ActR.snapshot.paramMap.get('id') || '');
    this.id_a = id;
    console.log('This is my id:', this.id_a);
    this.getAgreById(id);
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

  // saveData() {
  //   console.log(this.agrForm.value);

  // }

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

  getAgreById(id: number) {
    this.user.getAgremById(id).subscribe(
      (resp: any) => {
        this.agre_data = resp;
        this.extractUserData();
        this.agrForm.patchValue(this.agre_data);
        console.log('My data', this.agre_data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  extractUserData() {
    if (this.agre_data && this.agre_data.ag) {
      this.agre_data = this.agre_data.ag;
    }
  }

  updateInfo() {
    if (this.agrForm && this.agrForm.valid) {
      this.user.editInfoAgrem(this.id_a, this.agrForm.value).subscribe(
        () => {
          console.log('Great Work');
          this.goodNot();
          this.rou.navigate(['admin/info-agres']);

        },
        error => {
          console.error('Error:', error);

        }
      );
    }

  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agremiados´s info has been updated successfully!!!',
      showConfirmButton: false,
      timer: 1800
    })
  }


}
