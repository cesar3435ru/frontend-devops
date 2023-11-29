import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgremiadoService {

  getAuthAgr: EventEmitter<boolean> = new EventEmitter(false);
  private api = AppSettings.readAppSettings().taskSettings.apiURL;
  public requestsSubject: Subject<void> = new Subject<void>();
  public deleteRequestSubject: Subject<void> = new Subject<void>();



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

  getSolicitudesByAuthenticatedAgre() {
    return this.http.get(this.api + '/api/solicitudes', {
      withCredentials: true
    });
  }

  getRequestsObservable(): Observable<void> {
    return this.requestsSubject.asObservable();
  }

  deleteRequestById(id: number) {
    return this.http.delete(this.api + `/api/soli/${id}`, {
      withCredentials: true
    });
  }
  getRequestDeletedObservable(): Observable<void> {
    return this.deleteRequestSubject.asObservable();
  }


  uploadFile(formData: FormData) {
    return this.http.post(this.api + `/api/rsolicitud`, formData, {
      withCredentials: true
    });
  }

}


