import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Producto } from '../interface/producto';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductoResponse } from '../interface/productoResponse';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  getProductos():Observable<Producto[]> {
    return this.http.get<Producto[]>(`${ this.baseUrl }/api/productos`);
  }

  create(producto: Producto): Observable<ProductoResponse> {
    return this.http.post<ProductoResponse>(`${this.baseUrl}/api/productos`, producto)
      .pipe(
        map((response: ProductoResponse) => response),
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

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/api/productos/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error) {
          this.router.navigate(['/productos']);
          console.error(e.error.mensaje);
        }

        return throwError(() => new Error(e));
      }));
  }

  updateProducto(producto: Producto): Observable<ProductoResponse> {
    return this.http.put<ProductoResponse>(`${this.baseUrl}/api/productos/${producto.id}`, producto).pipe(
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

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<Producto>(`${this.baseUrl}/api/productos/${id}`).pipe(
      catchError(e => {
        if (e.error) {
          console.error(e.error);
        }
        return throwError(() => new Error(e));
      }));
  }

}
