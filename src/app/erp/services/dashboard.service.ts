import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ComprobantesPorMesDashDao } from '../interface/comprobantesPorMesDashDao';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  getComprobantesPorMesDashDao(nombre: string): Observable<ComprobantesPorMesDashDao[]> {
    return this.http.get<ComprobantesPorMesDashDao[]>(`${this.baseUrl}/api/dashboard/${nombre}`);
  }


}
