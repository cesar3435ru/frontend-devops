import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private logService: AdminService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir al usuario al inicio de sesión en caso de estado 401
          console.log('Error 401');
          this.alertError();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }


  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Access is denied!',
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false
    })
  }
}
