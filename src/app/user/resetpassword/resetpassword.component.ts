import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  console: any;
  constructor(private service: AuthServiceService,
              private router: Router,
              //private toastr: ToastrService,
              private sharedService: SharedServicesService){}
      resetForm !: FormGroup
    ngOnInit(): void {
      this.resetForm = new FormGroup({
       
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
      interface ApiResponse {
        message: string;
      }
      const email = this.sharedService.getEmail();
      console.log(email)
      this.service.resetPassword({email,password:this.resetForm.value.password}).subscribe(
        (res: object) => {
          const apiResponse = res as ApiResponse;
          if (apiResponse.message === 'password has been reset') {
           // this.toastr.success(apiResponse.message)
            this.router.navigate(['login']); 
          } else  {
            //this.toastr.error(apiResponse.message);
          }
        },
        (error) => {
          console.error(error);
    
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
             // this.toastr.error('Invalid email ID or password');
            } else {
              //this.toastr.error('An unexpected error occurred');
            }
          }
        }
      );
    }
}
