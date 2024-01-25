import { Component, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.css']
})
export class TrainerHeaderComponent {
  constructor(private service:AuthService){}
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
