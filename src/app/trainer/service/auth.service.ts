import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { signupData, loginData,trainerData } from 'src/app/interface/trainer-interface';
import { Blog, Response } from 'src/app/interface/blog-interface';
import { ApiResponse, UserInterface, UserData } from 'src/app/interface/user-interface';
import { trainerId, userId } from '../../interface/admin-interface';

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

  signup(data: any, file: File) {
    console.log("service: ", data);
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('image', file, file.name);
    return this.http.post(this.apiUrl + '/signup', formData);
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

  addBlog(id: string, data: Blog,file:File): Observable<Response> {
    const formData = new FormData();
    console.log("add blog")
    formData.append('id', id);
    formData.append('data', JSON.stringify(data));
    formData.append('image', file, file.name);
    return this.http.post<Response>(`${this.apiUrl}/addblog`,  formData );
  }

  getblog(id: string): Observable<Blog> {
    console.log('Fetching blog with id:', id);

    const stringId = String(id);
    const params = new HttpParams().set('id', stringId);
    return this.http.get<Blog>(this.apiUrl + '/getblog', { params });
  }

  getTrainerDetails(trainerId:string):Observable<trainerData>{
    console.log("id"+trainerId)
    const params = new HttpParams().set('trainerId', String(trainerId))
    return this.http.get<trainerData>(this.apiUrl+'/trainerdetails',{ params })
  }

  updateTrainer(trainerId:string, data:signupData):Observable<trainerData>{
    console.log(trainerId)
    return this.http.post<trainerData>(this.apiUrl+'/updatetrainer',{trainerId,data})
  }

  getUser(trainerId:string):Observable<ApiResponse>{
    console.log("trainer id: "+trainerId)
    const params = new HttpParams().set('trainerId', String(trainerId))
    return this.http.get<ApiResponse>(this.apiUrl+'/getusers',{ params })
  } 

  getUpdatedTrainetList(userId:string):Observable<trainerData>{
    const params = new HttpParams().set('userId',String(userId))
    return this.http.get<trainerData>(this.apiUrl+'/getupdatedtrainerlist',{ params })
  }

  deletBlog(blogId:string,trainerId:string):Observable<Response>{
    const params = new HttpParams().set('blogId', String(blogId)).set('trainerId', String(trainerId))
    return  this.http.get<Response>(this.apiUrl+'/deleteblog',{ params })

  }

  readMessage(roomId:string,trainerId:string){
    console.log("read checksdasadasddsasad: "+ roomId,trainerId)
    const params = new HttpParams().set('roomId', String(roomId)).set('trainerId', String(trainerId))

    return  this.http.get(this.apiUrl+'/readmessage',{ params })
  }

  getSubscribedUser(trainerId:string):Observable<ApiResponse>{
    const params = new HttpParams().set('trainerId', trainerId)
    return this.http.get<ApiResponse>(this.apiUrl+'/getsubscribeduser',{ params})
  }
  getSubscribedUserSearch(trainerId:string,text:string):Observable<ApiResponse>{
    const params = new HttpParams().set('trainerId', String(trainerId)).set('text', String(text))
    return this.http.get<ApiResponse>(this.apiUrl+'/searchsubscribeduser',{ params})
  }
}
