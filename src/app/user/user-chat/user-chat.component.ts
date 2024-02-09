import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { Trainer, trainerData } from 'src/app/interface/trainer-interface';
import { TokenData } from 'src/app/interface/user-interface';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserTrainerService } from 'src/app/services/user-trainer.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
})
export class UserChatComponent implements OnInit {
  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string; message: string }[] = [];
  public storageArray: any[] = [];

  public showScreen = false;
  public phone!: string;
  public currentUser: any;
  public selectedUser: any;
  decodedToken!: TokenData;

  public userList!: Trainer[];

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService,
    private trainerService: UserTrainerService
  ) {}

  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
    this.currentUser = this.decodedToken.id;
    this.getTrainer();
    console.log('ngOnInit called');
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        if (this.roomId) {
          setTimeout(() => {
            this.chatService.getStorage(this.roomId).subscribe((res: any) => {
              console.log('res:' + res.chats);
              this.storageArray = res.chats;
            });
          }, 500);
        }
      });
    
  }

  getTrainer() {
    this.trainerService
      .getSubscribedTrainer(this.decodedToken.id)
      .subscribe((res: trainerData) => {
        this.userList = [];
        this.userList.push(res.trainerData);
        console.log('traienrrr: ' + this.userList);
        console.log(this.userList.length);
      });
  }

  selectUserHandler(trainerId: string): void {
    this.selectedUser = this.userList.find((user) => user._id === trainerId);
    console.log('selected trainer: ' + this.selectedUser.firstName);
    this.messageArray = [];
    this.chatService
      .getroom(this.decodedToken.id, this.selectedUser._id)
      .subscribe((res: any) => {
        this.roomId = res.roomDetails._id;

        this.chatService.getStorage(this.roomId).subscribe((res: any) => {
          this.storageArray = res.chats;
          console.log('dataaa' + this.storageArray);
      });
 
    });

    console.log('dataaa' + this.storageArray);

    console.log('room: ' + this.roomId);
    console.log('data' + this.storageArray);
    const storeIndex = this.storageArray.findIndex(
      (storage) => storage.roomId === this.roomId
    );

   

    this.join(this.currentUser, this.selectedUser._id);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({
      userId: username,
      trainerId: this.selectedUser,
    });
  }

  sendMessage(): void {
    console.log(this.messageText);
    this.chatService.sendMessage({
      userID: this.decodedToken.id,
      trainerId: this.selectedUser._id,
      message: this.messageText,
    });
    this.chatService
      .storemessage(this.decodedToken.id, this.messageText, this.roomId)
      .subscribe((res: any) => {});
    this.chatService.getStorage(this.roomId).subscribe((res: any) => {
      this.storageArray = res.chats;
    });
    console.log('chat: ' + this.storageArray);
    const storeIndex = this.storageArray.findIndex(
      (storage) => storage.roomId === this.roomId
    );

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText,
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [
          {
            user: this.currentUser.name,
            message: this.messageText,
          },
        ],
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
}
