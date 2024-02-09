import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trainer } from '../interface/userTrainer-interface';

@Injectable({
  providedIn: 'root'
})
export class TrainerSharedService {
  private subscribedTrainerSubject = new BehaviorSubject<Trainer | null>(null);

  subscribedTrainer$ : Observable<Trainer | null> =  this.subscribedTrainerSubject.asObservable();

  subscribedTrainer(trainer:Trainer | null){
    this.subscribedTrainerSubject.next(trainer);
  }
}
