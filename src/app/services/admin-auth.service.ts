import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginData,userId, trainerId, ApiResponse, Response } from '../interface/admin-interface';
import { Food } from '../interface/food-interface';
import { Plan, PlanData } from '../interface/plan-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient,
              private router:Router) { }

  apiUrl = 'http://localhost:8080/admin'

  verifyLogin(data:loginData){
    return this.http.post(this.apiUrl+'/verifylogin',data)
  }

  isLogin(){
    return localStorage.getItem('adminToken')!=null
  }

  getUserRole(){
    return localStorage.getItem('adminToken') != null?localStorage.getItem('role')?.toString():''
  }

  logout(){
    localStorage.removeItem('adminToken')
    this.router.navigate(['admin/login'])
    
  }

  userSerach(value:string){
 
    const body = {value:value}
    return this.http.post(`${this.apiUrl}/search`,body)
  }

  trainerSearch(value:string){
   
    const params = new HttpParams().set('value',value)
    return this.http.get(this.apiUrl+'/trainersearch',{params})
  }
  getTrainer(): Observable<ApiResponse>{
    console.log("admin trainer")
    return this.http.get<ApiResponse>(this.apiUrl+'/trainerdashboard')
  }

  getUser(){
    console.log("admin trainer")
    return this.http.get(this.apiUrl+'/userdashboard')
  }
 
  userDelete(id:userId){
    console.log(id)
  return this.http.get(`${this.apiUrl}/delete?id=${id}`);
  }

  toggleBlockUser(id:userId){
    const stringId = String(id._id)
    console.log(stringId+'to blocked')
  const params = new HttpParams().set('id', stringId)
  return this.http.get(this.apiUrl+'/toggleBlock',{ params })
  }
 
  toggleBlockTrainer(id:trainerId){
    const stringId = String(id._id)
    console.log(stringId+'to blocked')
  const params = new HttpParams().set('id', stringId)
  return this.http.get(this.apiUrl+'/toggleBlockTrainer',{ params })
  }

  trainerStatusChange(id: trainerId, value: string){
    const stringId = String(id._id);
    console.log(stringId + ' to blocked');

    const params = new HttpParams()
      .set('id', stringId)
      .set('value', value);  // Add the 'value' parameter

    return this.http.get(this.apiUrl + '/trainerStatusChange', { params });
  }

  addFood(data:Food){
    console.log(data)
    return this.http.post(this.apiUrl+'/addfood',data)
  }

  addPlan(data:string): Observable<Response>{
    console.log(data)
    return this.http.post<Response>(this.apiUrl+'/addplan', data)
  }
  getPlan():Observable<PlanData>{
    return this.http.get<PlanData>(this.apiUrl+'/getplans')
  }
}
