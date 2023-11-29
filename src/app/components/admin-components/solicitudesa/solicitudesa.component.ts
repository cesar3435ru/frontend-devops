import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-solicitudesa',
  templateUrl: './solicitudesa.component.html',
  styleUrls: ['./solicitudesa.component.scss']
})
export class SolicitudesaComponent {

  solicitudes: any[] = [];
  filtros: any[] = [];
  searchTerm: string = '';
  p: number = 1;
  page: number = 1;


  constructor(private admin: AdminService, private theForm: FormBuilder, private datePipe: DatePipe) {
    this.showSolicitudes();

  }

  showSolicitudes() {
    this.admin.getSolicitudesByAdmin().subscribe(
      (data: any) => {
        this.solicitudes = data;
        console.log('my data', this.solicitudes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  filterSolis() {
    if (this.solicitudes && this.solicitudes.length > 0) {
      return this.solicitudes.filter(solis =>
        solis.user.nue.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return [];
    }
  }
  getFilteredSolis() {
    const filteredAdmins = this.filterSolis();
    return filteredAdmins.slice();
  }

  //Comparo que tipo de archivo es
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  isPdf(url: string): boolean {
    return /\.pdf$/i.test(url);
  }

  isDocx(url: string): boolean {
    return /\.docx$/i.test(url);
  }

  //Info para el filtro
  isImg(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  esPdf(url: string): boolean {
    return /\.pdf$/i.test(url);
  }

  esDocx(url: string): boolean {
    return /\.docx$/i.test(url);
  }

  downloadFileBB(id: number) {
    this.admin.downloadFile(id).subscribe(
      (data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'File-ready'; // Reemplaza 'nombre_del_archivo' con el nombre que desees para el archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

  downloadFileFilter(id: number) {
    this.admin.downloadFile(id).subscribe(
      (data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'File-ready'; // Reemplaza 'nombre_del_archivo' con el nombre que desees para el archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar:', error);
      }
    );
  }


  filterForm: FormGroup = this.theForm.group({
    start_date: [null, Validators.required],
    end_date: ["", Validators.required],

  });

  validateInput(campo: string) {
    return this.filterForm.controls[campo].errors && this.filterForm.controls[campo].touched
  }


  saveInfo() {
    console.log(this.filterForm.value);

    const startDateValue = this.filterForm.get('start_date')?.value;
    const endDateValue = this.filterForm.get('end_date')?.value;

    // Verifica si startDateValue y endDateValue son fechas válidas antes de convertirlas
    const startDate = startDateValue ? new Date(startDateValue).toISOString().split('T')[0] : '';
    const endDate = endDateValue ? new Date(endDateValue).toISOString().split('T')[0] : '';

    const formData = new FormData();
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);

    this.admin.getSolicitudesByFilter(startDate, endDate).subscribe(
      (response: any) => {
        this.filtros = response
        console.log('my filter', this.filtros);

        this.filterForm.reset();
      },
      (error) => {
        console.error('Error backend:', error);
        this.filterForm.reset();
      }
    );
  }

  formatDateToLocale(date: string | null): string {
    if (!date) {
      return ''; // o cualquier valor predeterminado que desees para fechas nulas
    }

    let fechaBD = new Date(date);

    // Sumar un día a la fecha
    fechaBD.setDate(fechaBD.getDate() + 1);

    // Formatear la fecha sumada a la zona horaria local
    return this.datePipe.transform(fechaBD, 'dd/MM/yyyy') || ''; // Puedes usar otros formatos según necesites
  }

  formatDateT(fecha: string | null): string {
    if (!fecha) {
      return ''; // o cualquier valor predeterminado que desees para fechas nulas
    }

    let fechaBD = new Date(fecha);

    // Sumar un día a la fecha
    fechaBD.setDate(fechaBD.getDate() + 1);

    // Formatear la fecha sumada a la zona horaria local
    return this.datePipe.transform(fechaBD, 'dd/MM/yyyy') || ''; // Puedes usar otros formatos según necesites
  }


}
