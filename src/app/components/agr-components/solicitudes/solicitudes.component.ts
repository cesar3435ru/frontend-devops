import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgremiadoService } from 'src/app/services/agremiado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent {

  constructor(private theForm: FormBuilder, private agre: AgremiadoService, private datePipe: DatePipe) {

    this.agre.getRequestsObservable().subscribe(() => {
      this.showRequests();
    });

    this.agre.getRequestDeletedObservable().subscribe(() => {
      this.showRequests();
    });




  }
  showForm = false;
  selectedFile: File | null = null;

  p: number = 1;
  searchTerm: string = '';

  requests: any[] = [];
  toggleForm() {
    this.showForm = !this.showForm;
  }
  progress: number = 0;
  showProgressBar = false;


  ngOnInit(): void {
    this.reqForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
    this.showRequests();
  }

  showRequests() {
    this.agre.getSolicitudesByAuthenticatedAgre().subscribe(
      (data: any) => {
        this.requests = data.solicitudes;
        console.log('my data', this.requests);
        this.getFilteredRequests();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateProgress() {
    const totalFields = 1;
    const completedFields = Object.values(this.reqForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
      // You can add more validations here, like checking the file type or size if needed
      // Save the selected file in a variable (for example, 'selectedFile')
      this.selectedFile = file;
    } else {
      // If no file is selected, mark the control as touched to trigger validation
      this.reqForm.get('ruta_archivo')?.markAsTouched();
    }
  }

  filterReqs() {
    if (this.requests && this.requests.length > 0) {
      return this.requests.filter(req =>
        req.created_at.includes(this.searchTerm) // 'fecha' es la propiedad que contiene la fecha en tu objeto 'req'
      );
    } else {
      return [];
    }
  }

  getFilteredRequests() {
    const filteredRequests = this.filterReqs();
    return filteredRequests.slice();
  }



  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Admin created successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  goodNoti() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Request deleted successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }


  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong!',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false
    });
  }

  reqForm: FormGroup = this.theForm.group({
    ruta_archivo: ["", Validators.required],
  });

  validateInput(campo: string) {
    return this.reqForm.controls[campo].errors && this.reqForm.controls[campo].touched
  }
  sendFile() {
    if (this.reqForm.invalid) return
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('ruta_archivo', this.selectedFile, this.selectedFile.name);
    }

    this.agre.uploadFile(formData).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        this.goodNot();
        this.agre.requestsSubject.next();
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
        this.badNot();
      }
    );

    // Restablecer el formulario después de enviar los datos
    this.reqForm.reset();
    this.updateProgress(); // Actualizar progreso después de guardar
    this.selectedFile = null;

  }

  cancelRequest(id: number) {
    this.agre.deleteRequestById(id).subscribe(
      () => {
        this.goodNoti();
        this.agre.deleteRequestSubject.next();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  confirmAlert(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cancelRequest(id);
      }
    });
  }


  formatDateToLocale(fecha: string | null): string {
    if (!fecha) {
      return ''; // o cualquier valor predeterminado que desees para fechas nulas
    }

    let fechaBD = new Date(fecha);

    // Sumar un día a la fecha
    fechaBD.setDate(fechaBD.getDate());

    // Formatear la fecha sumada a la zona horaria local
    return this.datePipe.transform(fechaBD, 'dd/MM/yyyy') || ''; // Puedes usar otros formatos según necesites
  }


}
