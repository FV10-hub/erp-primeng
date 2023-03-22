import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Compra } from '../interface/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.baseUrl}/api/compras`);
  }

  getCompra(id: string): Observable<Compra> {
    return this.http.get<Compra>(`${this.baseUrl}/api/compras/${id}`);
  }

  create(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(`${this.baseUrl}/api/compras`, compra);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/compras/${id}`);
  }

}
