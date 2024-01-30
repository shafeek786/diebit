import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan, PlanResponse, planApiResponse } from 'src/app/interface/plan-interface';
import { PlanserviceService } from 'src/app/services/planservice.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  subscription!: Plan;
  planId!: string 
  editPlan!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanserviceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {} 

  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPlan();
  }
  
  loadPlan() {
    if (this.planId) { // Check if planId is not null
      this.planService.getPlanWithId(this.planId).subscribe((plan: PlanResponse) => {
        this.subscription = plan.plan;
        console.log(this.subscription);
        this.initializeForm(); // Initialize the form after subscription data is loaded
      });
    } else {
      console.error("No plan ID provided."); // Handle case where planId is null
    }
  }
  
  initializeForm() {
    this.editPlan = this.formBuilder.group({
      planType: [this.subscription.planType],
      price: [this.subscription.price],
      blog: [this.subscription.blog],
      workoutPlan: [this.subscription.workoutPlan],
      chat: [this.subscription.chat],
      progressTracking: [this.subscription.progressTracking],
      trainer: [this.subscription.trainer],
      chatWithTrainer: [this.subscription.chat],
      videoCall: [this.subscription.videoCall]
    });
  }

  onSubmit() {
    console.log(this.editPlan.value)
    this.planService.editPlan(this.planId,this.editPlan.value).subscribe((res:planApiResponse)=>{
        if(res.message === 'success'){
          this.toastr.success("Plan edited successfully")
          this.router.navigate(['/admin/manageplans'])
        }
    })
  }
}
