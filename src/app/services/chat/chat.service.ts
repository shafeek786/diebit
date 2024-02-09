import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { StorageData } from 'src/app/interface/chat-interface';
import { userId, trainerId } from '../../interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: Socket;
  private url = 'http://localhost:8080';
  constructor(private http : HttpClient) {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data: { userId: string; trainerId: string;
  }){
    this.socket.emit('join', data)
  }

  sendMessage(data: { userID: string; trainerId: string; message:string }): void {
    console.log("message: "+ data.trainerId)
    this.socket.emit('message', data);

  }
storemessage(userId:string,message:string,roomId:string){
  return this.http.post(this.url+'/create-new-chat',{userId,message,roomId})
}
trainerStoremessage(trainerId:string,message:string,roomId:string){
  return this.http.post(this.url+'/trainer/create-new-chat',{trainerId,message,roomId})
}
  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      
      this.socket.on('new message', (data) => {
        observer.next(data);
        console.log("received message: "+ data.message)
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getroom(userId:string, trainerId:string){
    const params = new HttpParams().set('userId',String(userId)).set('trainerId',String(trainerId))
    return this.http.get(this.url+'/getroom',{ params })
  }
  getroombyTrainer(trainerId:string, userId:string){
    console.log(trainerId,userId)
    const params = new HttpParams().set('userId',String(userId)).set('trainerId',String(trainerId))
    return this.http.get(this.url+'/getroom',{ params })
  }
  getStorage(roomId:string) {
    const params = new HttpParams().set('roomId', String(roomId))
    return this.http.get(this.url+'/fetch-chatbyid',{ params })
  }

  setStorage(data: StorageData[]) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

}
