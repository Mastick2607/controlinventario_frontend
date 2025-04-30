import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private endpoint:string;
private apiUrl: string;


  constructor(
   private http: HttpClient
  ) { 

    this.endpoint =enviroment.url_api;
    this.apiUrl = 'login';
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}`, credentials);
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token')
    localStorage.removeItem('roles');
    localStorage.removeItem('user');

    // Devolvemos un Observable que emite true para indicar éxito
    return of(true)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  getUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }
  
  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  
  
  }

}
