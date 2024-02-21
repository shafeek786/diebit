import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TimeslotData } from 'src/app/interface/timeslotInterface';
import { trainerId } from '../../interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class TimeschedullerService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  apiUrl = 'https://bknd.diebit.world/api/trainer';

  addSlot(trainerId:string, date:Date,timeSlot:string):Observable<TimeslotData>{
    
    return this.http.post<TimeslotData>(this.apiUrl+'/addtimeslot',{trainerId,date,timeSlot})
  }

  getSlot(trainerId:string, date:Date):Observable<TimeslotData>{
    console.log("time check")
    const params = new HttpParams().set('trainerId',String(trainerId)).set('date', String(date))
    return this.http.get<TimeslotData>(this.apiUrl+'/getslot',{params})
  }

  cancelSlot(slotId:string,trainerId:string):Observable<TimeslotData>{
    console.log(slotId)
    const params = new HttpParams().set('slotId',String(slotId)).set('trainerId', String(trainerId))
    return this.http.get<TimeslotData>(this.apiUrl+'/cancelslot',{ params })
  }
}

