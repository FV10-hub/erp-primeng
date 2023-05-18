import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Proveedor } from '../interface/proveedor';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  generateReport(reportName: string, parameters: { [key: string]: string }, format: string): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    const queryParams = new HttpParams({ fromObject: parameters });
    console.log(queryParams);

    return this.http.get<Blob>(`${this.baseUrl}/api/reportes/${reportName}`, {
      headers,
      params: queryParams,
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

  generatePostReport(reportName: string, parameters: any): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json', // Indicamos que la respuesta será de tipo Blob
      observe: 'response' as 'body' // Observamos la respuesta completa incluyendo cabeceras
    };
    return this.http.post<HttpResponse<Blob>>(`${this.baseUrl}/api/reportes/${reportName}`, parameters, httpOptions);
  }

}
