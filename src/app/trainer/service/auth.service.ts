import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { signupData, loginData, Response, blog } from 'src/app/interface/trainer-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  apiUrl = 'http://localhost:8080/trainer';

  signup(data:signupData ) {
    console.log('signup');
    return this.http.post(this.apiUrl + '/signup', data);
  }

  verifyLogin(data: loginData) {
    return this.http.post(this.apiUrl + '/verifylogin', data);
  }

  getUserRole() {
    console.log(localStorage.getItem('role'));
    const trainerToken = localStorage.getItem('TrainerToken');
    return trainerToken ? localStorage.getItem('role')?.toString() : '';
  }

  logout() {
    console.log('Before logout: ' + localStorage.getItem('TrainerToken'));
    localStorage.removeItem('TrainerToken');
    console.log('After logout: ' + localStorage.getItem('TrainerToken'));

    // Ensure proper redirection after logout
    this.router.navigate(['/trainer/login']);
  }

  isLogin() {
    const isTokenPresent = localStorage.getItem('TrainerToken') !== null;
    console.log('Is TrainerToken present:', isTokenPresent);
    return isTokenPresent;
  }

  addBlog(id: string, data: blog): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/addblog`, { id, data });
  }

  getblog(id: string): Observable<blog> {
    console.log('Fetching blog with id:', id);

    const stringId = String(id);
    const params = new HttpParams().set('id', stringId);
    return this.http.get<blog>(this.apiUrl + '/getblog', { params });
  }
}
