import { Component, OnInit } from '@angular/core';
import { Plan, PlanData } from 'src/app/interface/plan-interface';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrls: ['./manage-plan.component.css']
})

export class ManagePlanComponent implements OnInit {
  subscription :Plan[] = []
  plans = [
    { type: 'Silver', price: 29.99, features: ['Workout Plans', 'Nutrition Plans'] },
    { type: 'Gold', price: 49.99, features: ['Workout Plans', 'Nutrition Plans', 'Progress Tracking'] },
    { type: 'Platinum', price: 79.99, features: ['Workout Plans', 'Nutrition Plans', 'Progress Tracking', 'Personal Trainer Support'] }
  ];
  constructor(private service:AdminAuthService){}
ngOnInit(): void {
    this.loadPlan()
    console.log(this.subscription.length)
}

  loadPlan(){
    this.service.getPlan().subscribe((res:PlanData)=>{
      this.subscription = res.plans
    })
  }
  addPlan() {
    
  }

  editPlan(plan:any) {
    // Add logic to edit the plan
  }

  deletePlan(plan:any) {
    // Add logic to delete the plan
  }
}
