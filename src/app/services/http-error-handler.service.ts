import { Injectable,ErrorHandler } from '@angular/core';
import {Observable,of} from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
@Injectable({
  providedIn: 'root'
})

export class HttpErrorHandler {
  constructor(){}
   
  createHandleError = (serviceName = '') => <T>
  (operation = 'operation', result = {} as T) => this.handleError(operation,result);

 handleError<T>(operation = "operation", result?: T) {
  return (error: any): Observable<T> => {
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
 
}
