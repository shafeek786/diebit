import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BiometricsComponent } from '../biometrics/biometrics.component';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenData } from 'src/app/interface/user-interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(private service: AuthServiceService, private dialog: MatDialog) {
  
  }
  ngOnInit(): void {
    interface id{
      id:string
    }
  
    const dec:TokenData = jwtDecode(localStorage.getItem('token') as string)
    console.log(dec)
    
      // Check if the user has filled the profile
      this.service.hasFiledProfile({
        id: dec.id,
        name: '',
        email: ''
      }).subscribe((Response:any) => {
        console.log(Response);
    
        if (Response.hasFilledProfile === false) {
          // Perform actions or navigate to a component/page
          console.log('User has not filled the profile');
          this.addBiometrics();
        }
      });
  }
  addBiometrics() {
    this.dialog.open(BiometricsComponent, {
      width: '100%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    });

    
  }
}
