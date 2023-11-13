import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent {

  constructor(private userA: AdminService, private rou: Router){
    this.getUser();
  }

  userData: any = {};

  logOut() {
    this.userA.logout().subscribe(
      (response) => {
        console.log('Logout successfully:', response);
        this.rou.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }


  
  confirmAction() {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, claro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
        Swal.fire({
          title: 'Logged Out!',
          text: 'Sesión cerrada exitosamente!',
          icon: 'success',
          timer: 1500, // 1.5 seconds
          showConfirmButton: false // Hide the button "OK"
        });
      }
    });
  }

  getUser() {
    this.userA.getUserInfo().subscribe((resp: any) => {
      this.userData = resp;
      console.log('User info:', this.userData);
    });
  }

}
