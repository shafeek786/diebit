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

  onSubmit(){
    interface ApiResponse {
      message: string,
      token: string
    }
  
    this.service.verifyLogin(this.loginForm.value).subscribe(
      (res: object) => {
        const apiResponse = res as ApiResponse;
        if (apiResponse.message === 'Success') {
          console.log("loooooogin")
          localStorage.setItem('TrainerToken', apiResponse.token)
        interface userdata{
          role:string
        }

        const dec:userdata =jwtDecode(apiResponse.token as string)
        localStorage.setItem('role', dec.role)
        console.log(localStorage.getItem('role'))
      
        console.log("ffff")
        if(localStorage.getItem('role') === 'Trainer'){
          console.log("in")
          this.router.navigate(['trainer/dashboard']); 

        }
        
          
        } else if (apiResponse.message === 'You are blocked' || 
        apiResponse.message === 'Invalid email ID or password' || 
        apiResponse.message === 'User not found' ||
        apiResponse.message === 'Please wait for the approvel') {
          console.log("trianer")
          this.toastr.error(apiResponse.message);
        }
      },
    );
  }

}
