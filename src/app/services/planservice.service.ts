import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlanId, PlanData, Plan, PlanResponse, planApiResponse, SubscriptionStatus } from '../interface/plan-interface';
import { Observable } from 'rxjs';
import { userId } from '../interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class PlanserviceService {

  constructor(private http:HttpClient,
    private router:Router 
    ) { }
apiUrl = 'https://diebit.world/api'
adminapiurl = 'https://diebit.world/api/admin'



getPlanWithId(planId:string):Observable<PlanResponse>{
  const params = new HttpParams().set('planId', String(planId))
  return this.http.get<PlanResponse>(this.adminapiurl+'/getplanwithid',{ params })
}

editPlan(planId:string,planData:Plan):Observable<planApiResponse>{
    return this.http.post<planApiResponse>(this.adminapiurl+'/editplan',{planId,planData})
}


getPlan():Observable<PlanData>{
  return this.http.get<PlanData>(this.apiUrl+'/getplans')
}

updateUserPlan(userId:string,planId:string):Observable<planApiResponse>{
  return this.http.post<planApiResponse>(this.apiUrl+'/userplanupdate', {userId,planId})
}

checkSubscription(userId:string):Observable<SubscriptionStatus>{
  const params = new HttpParams().set('userId', String(userId))
  return this.http.get<SubscriptionStatus>(this.apiUrl+'/checkssubscription',{ params })
}

getUserPlan(userId:string):Observable<PlanResponse>{
  console.log(userId)
  const params = new HttpParams().set('userId', userId)
  return this.http.get<PlanResponse>(this.apiUrl+'/getuserplan',{ params })
}

deletePlan(planId:string):Observable<PlanData>{
  const params = new HttpParams().set('planId', String(planId))
  return this.http.get<PlanData>(this.apiUrl+'/admin/deleteplan',{ params })
}
}

