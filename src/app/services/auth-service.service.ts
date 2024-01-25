import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SharedCaloriesService } from '../shared-calories.service';
import { Food, FoodHistory, foodHistory } from '../interface/food-interface';
import { WeightHistoryData, weight } from '../interface/weight-interface';
import { OtpData, ResendOtp, ResetPassword, TokenData, UpdateProfileData, UserId, UserSignupData } from '../interface/user-interface';
import { loginData } from '../interface/trainer-interface';
import { ApiResponse } from '../interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,
    private router:Router,
    private snackbar: MatSnackBar,
    private caloriesService: SharedCaloriesService 
    ) { }
apiUrl = 'http://localhost:8080'

proceedRegister(userdata:UserSignupData){
console.log("value")
console.log(userdata)
return this.http.post(this.apiUrl+'/signup',userdata)
}

verifyOtp(otp:OtpData){
console.log(otp)
return this.http.post(this.apiUrl+'/verifyotp', otp)
}

verifyLogin(loginData:loginData){
return this,this.http.post(this.apiUrl+'/verifyLogin',loginData)
}

forgotOtp(email:string){
return this.http.post(this.apiUrl+'/forgotpassword',email)
}

resetPassword(data:ResetPassword){
return this.http.post(this.apiUrl+'/resetpassword',data)
}

resendOtp(email:ResendOtp){
console.log(email)
return this.http.post(this.apiUrl+'/resendotp',email)
}

isLogin(){
return localStorage.getItem('token')!=null
}

getUserRole(){
return localStorage.getItem('token') != null?localStorage.getItem('role')?.toString():''
}


hasFiledProfile(id: TokenData): Observable<boolean> {
console.log('Original id:', id);

const stringId = String(id.id); // Convert the id to a string
console.log('String id:', stringId);

const params = new HttpParams().set('id', stringId);

return this.http.get<boolean>(`${this.apiUrl}/checkprofile`, { params });
}

logout(){
localStorage.removeItem('token')
this.router.navigate(['/login'])

this.snackbar.open('Logout Seccessful', '',{
duration:3000,
horizontalPosition: 'center',
verticalPosition: 'top'
})
}

updateProfile(data:UpdateProfileData): Observable<ApiResponse>{
return this.http.post<ApiResponse>(this.apiUrl+'/updateprofile',data)
}

isBlocked(id:UserId){
  const stringId = String(id.id)
  const params = new HttpParams().set('id', stringId)
  return this.http.get(this.apiUrl+'/isblocked',{ params })
}

updateWeight(data:weight){
  console.log(data)
  return this.http.post(this.apiUrl+'/updateweight',data)
}

getWeightHistory(id:string){
  const stringId = String(id)
  const params = new HttpParams().set('id', stringId)
  return this.http.get(this.apiUrl+'/getweighthistory',{ params})
}



addFodtoUser(foodId:string,userId:string,data:Food){
  return this.http.post(this.apiUrl+'/addfoodtouser',{foodId:foodId,userId:userId,data})
}

getUser(id:string){
  const stringid = String(id)
  const params = new HttpParams().set('id',stringid)
  return this.http.get(this.apiUrl+'/getuser',{ params})
  
}

getUsrFoodHistory(id: string): Observable<FoodHistory> {
  const stringId = String(id);
  const params = new HttpParams().set('id', stringId);
  
  return this.http.get<FoodHistory>(this.apiUrl + '/getuserfoodhistoory', { params }).pipe(
    tap((res: FoodHistory) => {
      this.caloriesService.updateConsumedCalories(res.todayCalorieIntake); // Update consumed calories using SharedCaloriesService
    })
  );
}

getFoodHistorywithDate(id: string, date: Date): Observable<FoodHistory> {
  const stringId = String(id);
  const dateString = date.toISOString(); // Convert Date to string
  const params = new HttpParams().set('id', stringId).set('date', dateString);
  return this.http.get<FoodHistory>(this.apiUrl + '/getuserfoodhistoory', { params });
}


getWeightHistoryWithDate(id:string, date:Date){
  const stringId = String(id)
  const dateString = date.toISOString(); // Convert Date to string
  const params = new HttpParams().set('id', stringId).set('date', dateString);
  return this.http.get(this.apiUrl+'/weighthistorytracker', { params })
}
getWeightHistoryTracker(id:string):Observable<WeightHistoryData>{
  console.log("weightHistory")
  const stringId = String(id)
  const params = new HttpParams().set('id',stringId)
  return this.http.get<WeightHistoryData>(this.apiUrl+'/weighthistorytracker',{params}).pipe(
    tap((res: WeightHistoryData) => {
      this.caloriesService.updateWeight(res.todayWeightHistory); // Update consumed calories using SharedCaloriesService
    })
  );
}

removeFoodEntry(entryId:string): Observable<FoodHistory>{
  const params = new HttpParams().set('id', String(entryId))
  return this.http.get<FoodHistory>(this.apiUrl+'/deletefoodentry',{ params })
}

}

