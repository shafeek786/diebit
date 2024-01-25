import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup

  constructor(
            private service: AuthServiceService,
            private toastr: ToastrService,
            private router: Router,
            private snackBar: MatSnackBar
    
    ){}

    ngOnInit(): void {
    
      this.loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null,Validators.required)
      })
    }

    onSubmit() {
      interface ApiResponse {
        message: string,
        token: string
      }
    
      this.service.verifyLogin(this.loginForm.value).subscribe(
        (res: object) => {
          const apiResponse = res as ApiResponse;
          if (apiResponse.message === 'Success') {
            console.log("loooooogin")
            localStorage.setItem('token', apiResponse.token)
          interface userdata{
            role:string
          }

          const dec:userdata =jwtDecode(apiResponse.token as string)
          localStorage.setItem('role', dec.role)
          console.log("loooooogin")
          if(this.service.getUserRole() === 'user'){
            this.router.navigate(['dashboard']); 
            this.snackBar.open('Login successfully!', 'Close', {
              duration: 3000,  
              verticalPosition: 'top',  
              horizontalPosition: 'center'  
            });
          }
          
            
          } else if (apiResponse.message === 'You are blocked' || apiResponse.message === 'Invalid email ID or password' || apiResponse.message === 'User not found') {
           this.toastr.error(apiResponse.message);
          }
        },
        (error) => {
          console.error(error);
    
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
             this.toastr.error('You are blocked.Please contact admin');
            } else {
              this.toastr.error('An unexpected error occurred');
            }
          }
        }
      );
    }
}
