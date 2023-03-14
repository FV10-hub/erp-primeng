import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Cliente } from '../interface/cliente';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${ this.baseUrl }/api/clientes`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/api/clientes`, cliente)
      .pipe(
        map((response: Cliente) => response),
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

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/api/clientes/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }

        return throwError(() => new Error(e));
      }));
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/api/clientes/${cliente.id}`, cliente).pipe(
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

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<Cliente>(`${this.baseUrl}/api/clientes/${id}`).pipe(
      catchError(e => {
        if (e.error) {
          console.error(e.error);
        }
        return throwError(() => new Error(e));
      }));
  }

}
