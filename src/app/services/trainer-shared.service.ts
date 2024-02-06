import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trainer } from '../interface/userTrainer-interface';

@Injectable({
  providedIn: 'root'
})
export class TrainerSharedService {
  private subscribedTrainerSubject = new BehaviorSubject<Trainer >({} as Trainer);

  subscribedTrainer$ : Observable<Trainer> =  this.subscribedTrainerSubject.asObservable();

  subscribedTrainer(trainer:Trainer){
    this.subscribedTrainerSubject.next(trainer);
  }
}
