import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    const trainerToken = localStorage.getItem('trainerToken');
    const adminToken = localStorage.getItem('adminToken');
  
    console.log('Current URL path:', window.location.pathname);

    if (window.location.pathname.includes('/trainer') && trainerToken) {
      console.log('Trainer token:', trainerToken);
      return this.handleRequestWithToken(req, trainerToken, next);
    } else if (window.location.pathname.includes('/admin') && adminToken) {
      console.log('Admin token:', adminToken);
      return this.handleRequestWithToken(req, adminToken, next);
    } else if (window.location.pathname.includes('/') && userToken) {
      console.log('User token:', userToken);
      return this.handleRequestWithToken(req, userToken, next);
    } else {
      console.log('No token found');
      // No token found, continue with the original request
      return next.handle(req);
    }
  }

  private handleRequestWithToken(req: HttpRequest<any>, token: string, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    return next.handle(modifiedReq).pipe(
      catchError(error => {
        // Handle errors here
        console.error('Error occurred:', error);
        throw error; // re-throw the error to maintain the observable chain
      })
    );
  }
}
