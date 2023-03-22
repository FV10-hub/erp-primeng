import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Proveedor } from '../interface/proveedor';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  getProveedores():Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${ this.baseUrl }/api/proveedores`);
  }

  create(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.baseUrl}/api/proveedores`, proveedor)
      .pipe(
        map((response: Proveedor) => response),
        catchError(e => {
          if (e.status == 400) {
            return throwError(() => new Error(e));
          }
          if (e.error) {
            console.error(e.error);
          }
          return throwError(() => new Error(e));
        }));
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.baseUrl}/api/proveedores/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error) {
          this.router.navigate(['/proveedores']);
          console.error(e.error.mensaje);
        }

        return throwError(() => new Error(e));
      }));
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.baseUrl}/api/proveedores/${proveedor.id}`, proveedor).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => new Error(e));
        }
        if (e.error) {
          console.error(e.error);
        }
        return throwError(() => new Error(e.error));
      }));
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete<Proveedor>(`${this.baseUrl}/api/proveedores/${id}`).pipe(
      catchError(e => {
        if (e.error) {
          console.error(e.error);
        }
        return throwError(() => new Error(e));
      }));
  }

}
