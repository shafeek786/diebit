import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedServicesService
  ) {}

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobileNumber': new FormControl(null, [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  };

  onSubmit() {
    console.log("submitted");
    this.sharedService.setEmail(this.signupForm.value.email)
    interface ApiResponse {
      message: string;
    }

    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.service.proceedRegister(this.signupForm.value).subscribe(
        (res: Object) => {
          console.log('Subscription callback executed');
          const apiResponse = res as ApiResponse;
          console.log(apiResponse.message)
          if (apiResponse.message === 'otp has been sent, Please verify otp') {
            console.log("otp")
            this.router.navigate(['otp']);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        (error) => {
          console.error('Error in subscribe:', error);
        }
      );
    }
  }
}
