import { Component, Input } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private service:AdminAuthService){}
  @Input() collapsed = false
  @Input() screenWidth = 0
  logout(){
    this.service.logout()
  }



  getBoddyClass():string{
    let styleClass = ''
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'body-trimmed'
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
      return styleClass
  }
}
