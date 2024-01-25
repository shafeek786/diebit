import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private service : AuthServiceService){}
  name!:string
  ngOnInit(): void {
    interface user{
      name:string
    }
    const userData:user = jwtDecode(localStorage.getItem('token') as string)
     this.name = userData.name
  }
  logout(){
   
    this.service.logout()
  }
}
