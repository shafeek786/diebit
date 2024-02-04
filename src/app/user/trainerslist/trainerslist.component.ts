import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'src/app/interface/plan-interface';
import { Trainer, TrainerList } from 'src/app/interface/userTrainer-interface';
import { UserTrainerService } from 'src/app/services/user-trainer.service';
import { TrainerDetailComponent } from '../trainer-detail/trainer-detail.component';
import { trainerId } from '../../interface/admin-interface';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css']
})
export class TrainerslistComponent implements OnInit {
    constructor(private trainerService: UserTrainerService,
                private dialog: MatDialog){}
  trainerData!:Trainer[]
  ngOnInit(): void {
      console.log("trainer list")
      this.getTrainers()
  }

  getTrainers(){
      this.trainerService.getTrainers().subscribe((res:TrainerList)=>{
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
}
