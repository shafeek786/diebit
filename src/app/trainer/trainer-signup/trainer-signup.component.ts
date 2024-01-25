import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-trainer-signup',
  templateUrl: './trainer-signup.component.html',
  styleUrls: ['./trainer-signup.component.css']
})
export class TrainerSignupComponent implements OnInit {
  constructor(private service: AuthService,
              private router:Router){}
    signupForm !: FormGroup

    ngOnInit(): void {
      this.signupForm = new FormGroup({
        'firstName': new FormControl(null,Validators.required),
        'lasrName': new FormControl(null,Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNumber': new FormControl(null, [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
      'qualification': new FormControl(null,Validators.required),
      'yearsofexperience': new FormControl(null,Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, Validators.required)
      })
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };

    onSubmit(){
      this.service.signup(this.signupForm.value).subscribe((res:any)=>{
        if(res.message ==='success'){
          console.log("suc")
          this.router.navigate(['trainer/confirmpage'])
        }else {
         // this.toastr.error(res.message);
        }
      })

    }



}
