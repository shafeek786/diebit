import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse, TokenData } from 'src/app/interface/user-interface';
import { UserInterface } from '../../interface/user-interface';
import { AuthService } from '../service/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  decodedToken!:TokenData
  public userList!: UserInterface[]
  public showScreen = false;
  public phone!: string;
  public currentUser: any;
  public selectedUser: any;
  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string, message: string }[] = [];
  public storageArray : any[] = [];

  constructor(private chatService: ChatService,
              private service: AuthService){}
  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('TrainerToken')as string)
    this.currentUser = this.decodedToken.id
      this.getUser()
      this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        if (this.roomId) {
          setTimeout(() => {
            this.chatService.getStorage(this.roomId).subscribe((res: any) => {
              console.log('res:' + res.chats);
              this.storageArray = res.chats;
            });
            console.log('data' + this.storageArray);

            const storeIndex = this.storageArray.findIndex(
              (storage: {
                roomId: string;
                chats: { user: string; message: string }[];
              }) => storage.roomId === this.roomId
            );
            if (storeIndex > -1) {
              this.messageArray = this.storageArray[storeIndex].chats;
            }
          }, 500);
        }
      });
  }

  getUser(){
    console.log("trainerId:"+ this.decodedToken.id)
    this.service.getUser(this.decodedToken.id).subscribe((res:ApiResponse)=>{
      this.userList= res.userData
      console.log(this.userList)
    })
  }
  selectUserHandler(email: string): void {
  
    this.selectedUser = this.userList.find(user => user.email === email);
    console.log("selected trainer: "+ this.selectedUser.name)
    this.messageArray = [];
    this.chatService.getroombyTrainer(this.decodedToken.id,this.selectedUser._id).subscribe((res:any)=>{
      this.roomId = res.roomDetails._id
      this.chatService.getStorage(this.roomId).subscribe((res:any)=>{
        this.storageArray = res.chats
      });
    })

   
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({userId: username, trainerId:this.decodedToken.id });
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      userID: this.selectedUser._id,
      trainerId: this.decodedToken.id,
      message: this.messageText
    });
    this.chatService.trainerStoremessage(this.decodedToken.id,
      this.messageText,
      this.roomId).subscribe((res:any)=>{

    })
    this.chatService.getStorage(this.roomId).subscribe((res:any)=>{
      this.storageArray = res.chats
    });
    console.log(this.storageArray)
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
}
