// admin-addfood.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-addfood',
  templateUrl: './admin-addfood.component.html',
  styleUrls: ['./admin-addfood.component.css']
})
export class AdminAddfoodComponent {
  foodForm!: FormGroup;

  constructor(private fb: FormBuilder,
     private service: AdminAuthService,
     private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
  
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      category: ['',Validators.required],
      energy: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      carbohydrate: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      fiber: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      sugar: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      protein: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      fat: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      vitamins: this.fb.group({
        a: new FormControl(null,Validators.pattern(/^[0-9]+$/)),
        b1: [null, Validators.pattern(/^[0-9]+$/)],
        b2: [null, Validators.pattern(/^[0-9]+$/)],
        b3: [null, Validators.pattern(/^[0-9]+$/)],

        b5: [null, Validators.pattern(/^[0-9]+$/)],
        b6: [null, Validators.pattern(/^[0-9]+$/)],
        b9: [null, Validators.pattern(/^[0-9]+$/)],
        b12: [null, Validators.pattern(/^[0-9]+$/)],
        c: [null, Validators.pattern(/^[0-9]+$/)],
        d: [null, Validators.pattern(/^[0-9]+$/)],
        e: [null, Validators.pattern(/^[0-9]+$/)],
        biotin: [null, Validators.pattern(/^[0-9]+$/)]
      }),
      minerals: this.fb.group({
        calcium: [null, Validators.pattern(/^[0-9]+$/)],
        iron: [null, Validators.pattern(/^[0-9]+$/)],
        zinc: [null, Validators.pattern(/^[0-9]+$/)],
        magnesium: [null, Validators.pattern(/^[0-9]+$/)],
        copper: [null, Validators.pattern(/^[0-9]+$/)],
        chromium: [null, Validators.pattern(/^[0-9]+$/)],
        potassium: [null, Validators.pattern(/^[0-9]+$/)]
      })
    });
  }

  onSubmit() {
    console.log('Form Values Before Submission:', this.foodForm.value);
  
    // Handle form submission here
    this.service.addFood(this.foodForm.value).subscribe((res: any) => {
      if(res.message === 'success'){
        this.toastr.success("Food added successfully")
      }
    });
  }
}
