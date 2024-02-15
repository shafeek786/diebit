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
              private router:Router,
              private toaastr : ToastrService){}
    signupForm !: FormGroup
    selectedFile!: File


    ngOnInit(): void {
      this.signupForm = new FormGroup({
        'firstName': new FormControl(null,Validators.required),
        'lastName': new FormControl(null),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNumber': new FormControl(null, [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
      'qualification': new FormControl(null,Validators.required),
      'profession' : new FormControl(null,Validators.required),
      'image':new FormControl(null),
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

    onFileSelected(event:any){
      this.selectedFile = event.target.files[0];

    }
    onSubmit(){
      console.log("component: ", this.signupForm.value);
      this.service.signup(this.signupForm.value, this.selectedFile).subscribe((res: any) => {
        if (res.message === 'success') {
          console.log("suc")
          this.router.navigate(['trainer/confirmpage'])
        }else if(res.message === 'Email ID already exists'){
            this.toaastr.error(res.message)
        }else{
          this.toaastr.error(res.message)
        }
      })

    }



}
