import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}user`;
  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl: string;
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AuthService')
  }
  signup(data: User) {
    return this.http.post(`${this.apiUrl}/add-user`, data, this.httpOptions)
    .pipe(
      catchError(this.handleError('add-user', null))
    )
  }
  login(data: any): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, data, this.httpOptions)
    .pipe(
      tap(user => this.doLogin(user)),
      mapTo(true),
      catchError(this.handleError('login', false))
    )
  }
  doLogin(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getDecodeToken(token: string) {
    return  this.decode(token)
  }
  private decode(token: string) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        console.log("error decoding token");
    }
  }
  isLoggedIn() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const token = this.getDecodeToken(currentUser.token);
      const currentTime = Math.round((new Date()).getTime() / 1000);
      if (token.exp > currentTime) {
        return true;
      } else {
        this.logout();
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
