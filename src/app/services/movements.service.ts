import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private endpoint:string;
  private apiUrl: string;
  constructor(    private http: HttpClient
  ) { 
    this.endpoint = enviroment.url_api;
    this.apiUrl = 'movements';
  }

  getMovements():Observable<any> {
  
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
  }

  getMovementsById(id:string):Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
  }

}
