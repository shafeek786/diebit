import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from 'src/app/interface/admin-interface';
import { Plan } from 'src/app/interface/plan-interface';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  planForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
             private service: AdminAuthService,
             private toastr: ToastrService) { }

  ngOnInit() {
    this.planForm = this.fb.group({
      planType: ['silver'],
      price: [199],
      blog: [false],
      chat: [false],
      trainer: [false],
      progressTracking: [false],
      workoutPlan: [false],
      videoCall: [false],
    });
  }

  onSubmit() {
    if (this.planForm !== null) {
      console.log(this.planForm.value);
      this.service.addPlan(this.planForm.value).subscribe((res: Response) => {
          this.toastr.success(res.message)
          this.router.navigate(['/admin/manageplans'])
      });
    }
  }
}
