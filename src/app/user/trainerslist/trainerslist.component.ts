import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/interface/plan-interface';
import { SubscribedTrainer, Trainer, TrainerList } from 'src/app/interface/userTrainer-interface';
import { UserTrainerService } from 'src/app/services/user-trainer.service';
import { TrainerDetailComponent } from '../trainer-detail/trainer-detail.component';
import { trainerId } from '../../interface/admin-interface';
import { TrainerSharedService } from '../../services/trainer-shared.service';
import { tokenData } from 'src/app/interface/tokenInterface';
import { jwtDecode } from 'jwt-decode';
import { signupData, trainerData } from 'src/app/interface/trainer-interface';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css']
})
export class TrainerslistComponent implements OnInit {
  subscribedTrainer!: Trainer 
  decodedToken!: tokenData
  searchText!:string
  selectedProfession!:string
    constructor(private trainerService: UserTrainerService,
                private dialog: MatDialog,
                private traienrSharedService: TrainerSharedService
                ){}
  trainerData!:Trainer[]
  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string)
      console.log("trainer list")
      this.getTrainers()
      this.getSubscribedTrainer()
      this.traienrSharedService.subscribedTrainer$.subscribe((res: Trainer | null) => {
        if (res) {
          console.log("res: ", res);
          this.subscribedTrainer = res;
          console.log("subscribed: ", this.subscribedTrainer);
        } else {
          console.log("No subscribed trainer.");
          // Handle the case where there is no subscribed trainer
        }
      });
    

  }

  getTrainers(){
      this.trainerService.getTrainers().subscribe((res:TrainerList)=>{
          this.trainerData = res.trainerData
      })
  }
  onSearchInputChange(event:any){

    console.log(event)
    this.trainerService.searchTrainer(event.target.value).subscribe((res:TrainerList)=>{
      this.trainerData = res.trainerData
    })
  }
  filterBy(text:string){
    this.trainerService.searchTrainer(text).subscribe((res:TrainerList)=>{
      this.trainerData = res.trainerData
    })
  }
  aboutTrainer(trainerId:string){
    this.dialog.open(TrainerDetailComponent,{
      width: '100%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { trainerId: trainerId }
    })
  }
  getSubscribedTrainer(){
    this.trainerService.getSubscribedTrainer(this.decodedToken.id).subscribe((res:trainerData)=>{
      this.subscribedTrainer = res.trainerData
   
    })
  }
}
