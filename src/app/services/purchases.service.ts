import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private endpoint:string;
  private apiUrl: string;
  constructor(    private http: HttpClient
  ) { 
    this.endpoint = enviroment.url_api;
    this.apiUrl = 'purchases';
  }


  getpurchases():Observable<any> {
  
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
  }


  addpurchases(Supplier: any):Observable<any>{
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}`,Supplier)
  }

  getpurchasesById(id:string):Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  // updatepurchases(id:string,SuppliersData: any): Observable<any> {
  //   return this.http.patch(`${this.endpoint}${this.apiUrl}/${id}`, SuppliersData);
  // }

  deletepurchases(id:string):Observable<any>{
    return this.http.delete<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }
}
