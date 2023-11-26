import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: AdminService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.auth.getAuth) {
        console.log('Access allowed babe testing');
        // this.goodNot();
        this.router.navigate(['/admin']); // Redirige al inicio de sesión
        return true; // Usuario autenticado
      } else {
        console.log('Access denied');
        return false;

      }
  }

  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Access is denied!',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false
    });
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Access is authorized!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  
}
