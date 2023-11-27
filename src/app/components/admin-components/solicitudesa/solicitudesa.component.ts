import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-solicitudesa',
  templateUrl: './solicitudesa.component.html',
  styleUrls: ['./solicitudesa.component.scss']
})
export class SolicitudesaComponent {

  solicitudes: any[] = [];
  searchTerm: string = '';
  p: number = 1;


  constructor(private admin: AdminService) {
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
  


}
