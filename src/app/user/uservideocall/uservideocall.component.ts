import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tokenData } from 'src/app/interface/tokenInterface';
import { Trainer, trainerData } from 'src/app/interface/trainer-interface';
import { UserTrainerService } from 'src/app/services/user-trainer.service';
import { trainerId } from '../../interface/admin-interface';
import { SocketService } from 'src/app/services/videocall/socket.service';

@Component({
  selector: 'app-uservideocall',
  templateUrl: './uservideocall.component.html',
  styleUrls: ['./uservideocall.component.css']
})
export class UservideocallComponent implements OnInit{

  constructor(private trainerService: UserTrainerService,
              private router: Router,
              private socketService: SocketService){

  }
  decodedToken!:tokenData
  public trainerList!: Trainer[];
  public selectedUser!: any
  ngOnInit(): void {
    console.log('ngOnInit called');
    this.decodedToken= jwtDecode(localStorage.getItem('token')as string)
      this.getTrainer()
  }
  getTrainer() {
    this.trainerService
      .getSubscribedTrainer(this.decodedToken.id)
      .subscribe((res: trainerData) => {
        this.trainerList = [];
        this.trainerList.push(res.trainerData);
        console.log('traienrrr: ' + this.trainerList);
        console.log(this.trainerList.length);
      });
  }
  selectUserHandler(trainerId: string): void {
    this.selectedUser = this.trainerList.find((user) => user._id === trainerId);
    console.log('selected trainer: ' + this.selectedUser.firstName);

  }

  startVideoCall(trainerId: string): void {
    const role = this.decodedToken.role
    const email = this.decodedToken.email
    this.socketService.userJoinRoom({email:email});
    console.log("trainer ID: "+ trainerId)
    this.router.navigate(['/videocall', trainerId,role]);
  }


}
