import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AgremiadoService } from '../services/agremiado.service';



@Injectable({
  providedIn: 'root'
})
export class AgremiadoGuard implements CanActivate {

  constructor(private agr: AgremiadoService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.agr.getAuthAgr) {
      console.log('Access allowed babe');
      this.goodNot();
      return true; // Usuario autenticado
    } else {
      console.log('No access');
      this.alertError();
      this.router.navigate(['/login']); // Redirige al inicio de sesión
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
    })
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Access is authorized!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}

