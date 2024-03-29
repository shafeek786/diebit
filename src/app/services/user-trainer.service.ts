import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Trainer, TrainerList, TrainerById, SubscribedTrainer } from '../interface/userTrainer-interface';
import { userId, trainerId } from '../interface/admin-interface';
import { Response, trainerData } from '../interface/trainer-interface';
import { ApiResponse, UserInterface } from '../interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserTrainerService {

  constructor(private http: HttpClient,
              private router: Router) { }
      apiUrl = 'https://bknd.diebit.world/api'

  getTrainers():Observable<TrainerList>{
    return this.http.get<TrainerList>(this.apiUrl+'/gettrianers')
  }

  getTrainerbyId(trainerId:string):Observable<TrainerById>{
    const params =new HttpParams().set('trainerId',trainerId)
      return this.http.get<TrainerById>(this.apiUrl+'/getTrainerbyid',{ params })
  }

  subscribeTrainer(userId: string,trainerId:string):Observable<trainerData>{
    console.log(trainerId)
    const params = new HttpParams().set('userId', userId).set('trainerId',trainerId)
    return this.http.get<trainerData>(this.apiUrl+'/subscribetrainer',{ params })
  }

  getSubscribedTrainer(userId:string):Observable<trainerData>{
    const params = new HttpParams().set('userId', userId)
    return this.http.get<trainerData>(this.apiUrl+'/getsubscribedtrainer',{ params })
  }

  getSubscribedTrainerChat(userId:string):Observable<TrainerList>{
    const params = new HttpParams().set('userId', userId)
    return this.http.get<TrainerList>(this.apiUrl+'/getsubscribedtrainer',{ params })
  }
  getUserUpdate(trainerId:string):Observable<ApiResponse>{
    const params = new HttpParams().set('trainerId', String(trainerId))
    console.log("trainer check: "+ trainerId)
    return this.http.get<ApiResponse>(this.apiUrl+'/updateduserlist',{ params })
  }

  searchTrainer(test:string):Observable<TrainerList>{
    const params = new HttpParams().set('text', String(test))
    return this.http.get<TrainerList>(this.apiUrl+'/searchtrainer', { params })
  }
  getblog():Observable<any>{
    return this.http.get(this.apiUrl+'/getblogs')
  }
}
