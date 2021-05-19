import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:9000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name,
      email,
      password,
      
    }, httpOptions);
  }


  logout() {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
  }

  isLoggedIn() {
    if (localStorage.getItem('auth-user') && localStorage.getItem('auth-token')) {
      return true;
    }
    return false;
  }

  // getAuthorizationToken() {
  //   const currentUser = JSON.parse(localStorage.getItem('auth-token'));
  //   return currentUser.token;
  // }

}
