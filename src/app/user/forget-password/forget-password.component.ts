import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  console: any;
  constructor(private service: AuthServiceService,
              private router: Router,
              //private toastr: ToastrService,
              private sharedService: SharedServicesService ){}
      forgotForm !: FormGroup
    ngOnInit(): void {
      this.forgotForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    }

    onSubmit() {
      interface ApiResponse {
        message: string;
      }
    
      this.service.forgotOtp(this.forgotForm.value).subscribe(
        (res: object) => {
          const apiResponse = res as ApiResponse;
  
          if (apiResponse.message === 'otp has been sent, Please verify otp') {
            this.sharedService.setEmail(this.forgotForm.value.email);
            this.router.navigate(['otp']);
          } else {
            //this.toastr.error(apiResponse.message);
          }
        },
        (error) => {
          console.error('Error in subscribe:', error);
        }
      );
    }
}
