import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent {
  @Input() collapsed = false
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
