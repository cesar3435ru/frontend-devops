import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAuth: EventEmitter<boolean> = new EventEmitter(false);
  // getAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public adminsSubject: Subject<void> = new Subject<void>();
  public deleteAdminsSubject: Subject<void> = new Subject<void>();

  public agresSubject: Subject<void> = new Subject<void>();
  public deleteAgrSubject: Subject<void> = new Subject<void>();

  public agremiadosSubject: Subject<void> = new Subject<void>();
  public deleteAgremiadoSubject: Subject<void> = new Subject<void>();

  public addAgremiadoSubject: Subject<void> = new Subject<void>();


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

  addAdmin(user: any) {
    return this.http.post(this.api + '/api/addadmin', user, {
      withCredentials: true
    });
  }
  getAdminsObservable(): Observable<void> {
    return this.adminsSubject.asObservable();
  }

  getAllAdmins() {
    return this.http.get(this.api + '/api/admins', {
      withCredentials: true
    });
  }

  deleteAdminById(id: number) {
    return this.http.delete(this.api + `/api/borraru/${id}`, {
      withCredentials: true
    });
  }
  getAdminsDeletedObservable(): Observable<void> {
    return this.deleteAdminsSubject.asObservable();
  }
  editAdmin(id: number, formData: FormData) {
    return this.http.put(this.api + `/api/user/${id}`, formData, {
      withCredentials: true
    });
  }





  addAgre(user: any) {
    return this.http.post(this.api + '/api/addagr', user, {
      withCredentials: true
    });
  }
  getAgresObservable(): Observable<void> {
    return this.agresSubject.asObservable();
  }

  getAllAgres() {
    return this.http.get(this.api + '/api/agremiados', {
      withCredentials: true
    });
  }

  deleteAgreById(id: number) {
    return this.http.delete(this.api + `/api/borraragr/${id}`, {
      withCredentials: true
    });
  }
  getAgresDeletedObservable(): Observable<void> {
    return this.deleteAgrSubject.asObservable();
  }
  editAgrem(id: number, formData: FormData) {
    return this.http.put(this.api + `/api/agr/${id}`, formData, {
      withCredentials: true
    });
  }



  //Funciones para agregar la info del agremiado
  addAgremiado(user: any) {
    return this.http.post(this.api + '/api/addagremiado', user, {
      withCredentials: true
    });
  }

  getAgremiadosObservable(): Observable<void> {
    return this.addAgremiadoSubject.asObservable();
  }

  getAllAgreamiados() {
    return this.http.get(this.api + '/api/agrs', {
      withCredentials: true
    });
  }

  deleteAgremiadoById(id: number) {
    return this.http.delete(this.api + `/api/bagremiado/${id}`, {
      withCredentials: true
    });
  }
  getAgremiadosDeletedObservable(): Observable<void> {
    return this.deleteAgremiadoSubject.asObservable();
  }


  getGeneros() {
    return this.http.get(this.api + '/api/generos', {
      withCredentials: true
    });
  }


  getNuesA() {
    return this.http.get(this.api + '/api/nues', {
      withCredentials: true
    });
  }

  getCuotas() {
    return this.http.get(this.api + '/api/cuotas', {
      withCredentials: true
    });
  }

  getAgremById(id: number) {
    return this.http.get(this.api + `/api/getagremiado/${id}`, {
      withCredentials: true
    });
  }

  editInfoAgrem(id: number, formData: FormData) {
    return this.http.put(this.api + `/api/agremiado/${id}`, formData, {
      withCredentials: true
    });
  }


}


