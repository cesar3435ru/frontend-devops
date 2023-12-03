import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
// import * as $ from 'jquery';
// import 'datatables.net';

declare var $: any;

@Component({
  selector: 'app-infoagres',
  templateUrl: './infoagres.component.html',
  styleUrls: ['./infoagres.component.scss']
})
export class InfoagresComponent implements OnInit {
  agremiados: any[] = [];
  agres: any[] = [];
  generos: any[] = [];
  nues: any[] = [];
  cuotas: any[] = [];
  selectedGender: any;
  selectedNue: any;
  selectedCuota: any;

  searchTerm: string = '';
  p: number = 1;

  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};


  constructor(private user: AdminService, private theForm: FormBuilder, private rou: Router) {
    this.showAgremiados();
    this.showGeneros();
    this.showNues();
    this.showCuotas();
    this.user.getAgremiadosObservable().subscribe(() => {
      this.showAgremiados();
    });

    this.user.getAgremiadosDeletedObservable().subscribe(() => {
      this.showAgremiados();
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25],
      responsive: true,
      destroy: true,
      dom: 'Blfrtip',
      buttons: [
        {
          extend: 'print',
          text: '<i class="fas fa-print" style="color: red;"></i> Imprimir',
          exportOptions: {
            columns: ':not(:last-child)'
          },
          className: 'btn-danger'
        },
        {
          extend: 'excel',
          text: '<i class="fas fa-print" style="color: green;"></i> EXCEL',
          exportOptions: {
            columns: ':not(:last-child)'
          },
          className: 'btn-success'
        }
      ],
    };
    this.getAgremiados();
  }

  // ngOnDestroy(): void {
  //   if ($.fn.dataTable.isDataTable('#agrestable')) {
  //     $('#agrestable').DataTable().destroy();
  //   }

  // }

  ngOnDestroy(): void {
    const table = $('#agrestable').DataTable();
    if ($.fn.dataTable.isDataTable('#agrestable') && table !== null && typeof table !== 'undefined') {
      table.destroy();
    }
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

  // getAgremiados() {
  //   this.user.getAllAgreamiados().subscribe(
  //     (data: any) => {
  //       this.agres = data.agremiados;
  //       console.log('my data agres', this.agres);
  //       $('#agrestable').DataTable().destroy();
  //       setTimeout(() => {
  //         $('#agrestable').DataTable(this.dtOptions);
  //       }, 0);

  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  getAgremiados() {
    this.user.getAllAgreamiados().subscribe(
      (data: any) => {
        this.agres = data.agremiados;
        console.log('my data agres', this.agres);
        $('#agrestable').DataTable().destroy();
        setTimeout(() => {
          $('#agrestable').DataTable(this.dtOptions);
        }, 100); // Ajusta el tiempo según sea necesario
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  filterAgres() {
    if (this.agremiados && this.agremiados.length > 0) {
      return this.agremiados.filter(agres =>
        agres.user.nue.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return [];
    }
  }
  getFilteredAgres() {
    const filteredAdmins = this.filterAgres();
    return filteredAdmins.slice();
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

  goodNo() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agremiado has been deleted successfully!!!',
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


  deleteAgremiado(id: number) {
    this.user.deleteAgremiadoById(id).subscribe(
      () => {
        this.goodNo();
        this.user.deleteAgremiadoSubject.next();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  confirmDecision(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAgremiado(id);
      }
    });
  }

  editarAgremiado(id: number) {
    console.log('TESING', id);
    this.rou.navigateByUrl(`admin/agre/${id}`);
    // agre/:id
  }

}
