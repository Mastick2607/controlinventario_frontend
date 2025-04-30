import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
private endpoint:string;
private apiUrl: string;
private ruta: string;
private rutaTotalSales: string;
private rutaTotalRevenue : string;
  constructor(
    // public router:Router,
  private http: HttpClient
  ) { 

      this.endpoint =enviroment.url_api;
      this.apiUrl = 'sales';
      this.ruta ='latestsales';
      this.rutaTotalSales ='totalsales';
      this.rutaTotalRevenue ='totalrevenue';
  }

  addSales(Sales: any):Observable<any>{
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}`,Sales)
  }


  getSales():Observable<any> {

    return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
  }

  getLatestSales():Observable<any> {

    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${this.ruta}`);
  }

  getTotalsales():Observable<any> {

    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${this.rutaTotalSales}`);
  }

  getTotalRevenue():Observable<any> {

    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${this.rutaTotalRevenue}`);
  }

  getSalesById(id:number):Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  deleteSales(id:string):Observable<any>{
    return this.http.delete<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }
}
