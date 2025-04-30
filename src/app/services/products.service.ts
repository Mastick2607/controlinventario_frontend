import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private endpoint:string;
  private apiUrl: string;
  private ruta: string;
private rutaTotalstock : string;


  constructor(
  // public router:Router,
  private http: HttpClient
  ) { 

    this.endpoint = enviroment.url_api;
    this.apiUrl = 'products';
    this.ruta = 'low-stock';
    this.rutaTotalstock = 'totalstock';
  }

  getlowStock():Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${this.ruta}`);
  }

  getTotalstock():Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${this.rutaTotalstock}`);
  }

  
  getProducts():Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
  }
  
  addProduct(product: any):Observable<any>{//crear productos
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}`,product)
  }


  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.patch(`${this.endpoint}${this.apiUrl}/${id}`, productData);
  }
  
  deleteProduct(id:number):Observable<any>{
    return this.http.delete<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }



}
