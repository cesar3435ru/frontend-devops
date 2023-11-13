import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAuth: EventEmitter<boolean> = new EventEmitter(false);
  // getAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private api = AppSettings.readAppSettings().taskSettings.apiURL;

  constructor(private http: HttpClient) { }

  setAuthStatus(isAuthenticated: boolean) {
    this.getAuth.emit(isAuthenticated);
  }

  // setAuthStatus(isAuthenticated: boolean) {
  //   this.getAuth.next(isAuthenticated); // Actualiza el valor del BehaviorSubject
  // }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  loginIn(user: any) {
    return this.http.post(this.api + '/api/login', user, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.getAuth.emit(true); // Emitir un evento para indicar que el usuario está autenticado
        // this.setAuthStatus(true);
      })
    );
  }




  getUserInfo() {
    return this.http.get(this.api + '/api/profilead', {
      withCredentials: true
    });
  }



  logout() {
    return this.http.post(this.api + '/api/logout', null, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.getAuth.emit(false);
        // this.setAuthStatus(false);
      })
    );
  }
}


