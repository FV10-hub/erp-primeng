import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { AjusteStock } from '../interface/ajuste-stock';

@Injectable({
  providedIn: 'root'
})
export class AjusteStockService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getAjusteStocks(): Observable<AjusteStock[]> {
    return this.http.get<AjusteStock[]>(`${this.baseUrl}/api/ajusteStock`);
  }

  getAjusteStock(id: string): Observable<AjusteStock> {
    return this.http.get<AjusteStock>(`${this.baseUrl}/api/ajusteStock/${id}`);
  }

  create(ajusteStock: AjusteStock): Observable<AjusteStock> {
    return this.http.post<AjusteStock>(`${this.baseUrl}/api/ajusteStock`, ajusteStock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/ajusteStock/${id}`);
  }

}
