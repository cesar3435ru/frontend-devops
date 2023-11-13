import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgremiadoService {

  getAuthAgr: EventEmitter<boolean> = new EventEmitter(false);
  private api = AppSettings.readAppSettings().taskSettings.apiURL;

  constructor(private http: HttpClient) { }

  setAuthStatus(isAuthenticated: boolean) {
    this.getAuthAgr.emit(isAuthenticated);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  loginIn(user: any) {
    return this.http.post(this.api + '/api/loginagr', user, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.getAuthAgr.emit(true); // Emitir un evento para indicar que el usuario está autenticado
        // this.setAuthStatus(true);
      })
    );
  }




  getUserInfo() {
    return this.http.get(this.api + '/api/profileagr', {
      withCredentials: true
    });
  }



  logout() {
    return this.http.post(this.api + '/api/logoutt', null, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.getAuthAgr.emit(false);
      })
    );
  }
}


