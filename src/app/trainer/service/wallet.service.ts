import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://bknd.diebit.world/api/trainer';

  getWalletBalance(trainerId:string){
    const params = new HttpParams().set('trainerId',String(trainerId))

    return this.http.get(this.apiUrl+'/getwalletbalance',{ params })
  }

  getWalletHistory(trainerId:string){
    const params = new HttpParams().set('trainerId',String(trainerId))

    return this.http.get(this.apiUrl+'/getwalletjistory',{ params })
  }
  

}
