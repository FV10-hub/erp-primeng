import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Factura } from '../interface/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.baseUrl}/api/facturas`);
  }

  getFactura(id: string): Observable<Factura> {
    return this.http.get<Factura>(`${this.baseUrl}/api/facturas/${id}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.baseUrl}/api/facturas`, factura);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/facturas/${id}`);
  }

}
