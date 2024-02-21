import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class SignalService {

  private socket!: Socket;
  private url = 'https://diebit.world';
  constructor() {
    this.socket =  io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  initiateCall(userId: string, trainerId: string): void {
    this.socket.emit('initiateCall', { userId, trainerId });
  }

  acceptCall(userId: string, trainerId: string): void {
    this.socket.emit('acceptCall', { userId, trainerId });
  }

  rejectCall(userId: string, trainerId: string): void {
    this.socket.emit('rejectCall', { userId, trainerId });
  }
}
