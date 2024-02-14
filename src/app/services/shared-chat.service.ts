import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from '../interface/user-interface';
import { Trainer, trainerData } from '../interface/trainer-interface';

@Injectable({
  providedIn: 'root'
})
export class SharedChatService {

  constructor() { }

  private userListSubject = new BehaviorSubject<UserInterface[]>([])
  private trainerUnread = new BehaviorSubject<trainerData>({} as trainerData)
 
  private checkSubject = new BehaviorSubject<number>(0);
  check$: Observable<number> = this.checkSubject.asObservable();

  updateCheck(data: number): void {
    this.checkSubject.next(data);
  }
  userList$: Observable<UserInterface[]> = this.userListSubject.asObservable()
  trainerList$: Observable<trainerData> = this.trainerUnread.asObservable()

  updateUserList(userList:UserInterface[]){
    console.log("data checking shared: "+  userList)
    this.userListSubject.next(userList)
  }

  updateTraienrList(trainerData:trainerData){
    console.log("shared service:"+ trainerData)
    this.trainerUnread.next(trainerData)
  }
}


