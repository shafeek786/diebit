import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse } from 'src/app/interface/admin-interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.css']
})
export class BiometricsComponent {
  constructor(private service:AuthServiceService,
    public dialogRef: MatDialogRef<BiometricsComponent>,
    private router: Router) {}
 updateFrofileForm !: FormGroup

 ngOnInit(): void {
   this.updateFrofileForm = new FormGroup({
    "gender":new FormControl(null,Validators.required),
    "dob": new FormControl(null,Validators.required),
    "height": new FormControl(null,Validators.required),
    "weight":new FormControl(null,Validators.required)
   })
 }
 onSubmit(){
  interface id{
    id:string
  }

  const dec:id = jwtDecode(localStorage.getItem('token') as string)
  console.log(dec)
  this.service.updateProfile({id:dec.id,userData:this.updateFrofileForm.value}).subscribe((res:ApiResponse)=>{
      if(res.message === 'success'){
        this.dialogRef.close
        this.router.navigate(['dashboard'])
      }
  })
 }
}
