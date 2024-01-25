import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trainer-body',
  templateUrl: './trainer-body.component.html',
  styleUrls: ['./trainer-body.component.css']
})
export class TrainerBodyComponent {
  @Input() collapsed = true
  @Input() screenWidth = 0

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
