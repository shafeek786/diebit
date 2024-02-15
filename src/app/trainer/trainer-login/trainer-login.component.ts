import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-trainer-login',
  templateUrl: './trainer-login.component.html',
  styleUrls: ['./trainer-login.component.css']
})
export class TrainerLoginComponent implements OnInit {

  loginForm !: FormGroup
  constructor(private service:AuthService,
              private router:Router,
              private toastr: ToastrService
              ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
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
          localStorage.setItem('TrainerToken', apiResponse.token);
  
          // Decode the token to extract user role
          const decodedToken = jwtDecode(apiResponse.token) as { role: string };
  
          // Store the user role in localStorage
          localStorage.setItem('role', decodedToken.role);
  
          // Log the user role
          console.log('User Role:', localStorage.getItem('role'));
  
          // Redirect based on user role
          if (localStorage.getItem('role') === 'Trainer') {
            this.router.navigate(['trainer/dashboard']);
          } else {
            // Handle other roles or scenarios if needed
          }
        } else {
          // Handle error messages
          this.toastr.error(apiResponse.message);
        }
      },
      (error) => {
        // Handle errors that occur during the API request
        console.error('Error:', error);
        this.toastr.error('An error occurred. Please try again.');
      }
    );
  }

}
