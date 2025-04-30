import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private endpoint:string;
  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {

    this.endpoint = enviroment.url_api;
    this.apiUrl = 'categories';
   }

 
    getCategories():Observable<any> {
  
      return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
    }

    addCategory(Category: any):Observable<any>{
      return this.http.post<any>(`${this.endpoint}${this.apiUrl}`,Category)
    }

    getCategoryById(id:number):Observable<any>{
      return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
    }
  
    updateCategory(id: number,CategorytData: any): Observable<any> {
      return this.http.patch(`${this.endpoint}${this.apiUrl}/${id}`, CategorytData);
    }

    deleteCategory(id:number):Observable<any>{
      return this.http.delete<any>(`${this.endpoint}${this.apiUrl}/${id}`);
    }

}
