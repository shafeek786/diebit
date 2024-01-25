import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private service:AdminAuthService, private router:Router) {}
loginForm !: FormGroup
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password' :  new FormControl(null, Validators.required)
      })
    }
    onSubmit(){
      interface role{
        role:string
      }
      this.service.verifyLogin(this.loginForm.value).subscribe((res:any)=>{
        if(res.message === 'Success'){
          console.log("true")
          localStorage.setItem('adminToken', res.token)
          const decodeToken:role = jwtDecode(res.token as string)
          localStorage.setItem('role', decodeToken.role)
          console.log(this.service.getUserRole())

          if(this.service.getUserRole() === 'admin'){
            console.log("admin")
          //  this.toastr.success("login success")
           this.router.navigate(['admin/dashboard']); 
          }
        }else if(res.message === 'Invalid email ID or password'){
          //this.toastr.warning(res.message)
        }
      },
      )
    }
  
}
