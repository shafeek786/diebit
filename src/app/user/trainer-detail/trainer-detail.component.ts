import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTrainerService } from 'src/app/services/user-trainer.service';
import { trainerId } from '../../interface/admin-interface';
import { trainerData } from '../../interface/trainer-interface';
import { Trainer, TrainerById, TrainerList } from 'src/app/interface/userTrainer-interface';
import { tokenData } from 'src/app/interface/tokenInterface';
import { jwtDecode } from 'jwt-decode';
import { Plan, PlanResponse, planApiResponse } from 'src/app/interface/plan-interface';
import { PlanserviceService } from 'src/app/services/planservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit {
  trainerId!: string
  trainerData!: Trainer
  decodedToken!: tokenData
  userPlan!:string
  constructor(private trainerService: UserTrainerService,
              private planService: PlanserviceService,
              @Inject(MAT_DIALOG_DATA) public data: { trainerId: string},
              private dialogRef: MatDialogRef<TrainerDetailComponent>,
              private router: Router
    ){
      this.trainerId = data.trainerId
    }
  
  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
      this.getTrainer()
      this.getUserPlan()

  }

  getTrainer(){
      this.trainerService.getTrainerbyId(this.trainerId).subscribe((res:TrainerById)=>{
          this.trainerData=res.trainerData
      })
  }

  getUserPlan(){
    this.planService.getUserPlan(this.decodedToken.id).subscribe((res:PlanResponse)=>{
      this.userPlan = res.planName
      console.log(this.userPlan)
    })
      console.log("silevererr")
  }

  upgradePlan(){
    this.dialogRef.close()
    this.router.navigate(['/dashboard/subscription'])
  }
}
