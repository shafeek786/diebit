import { Component } from '@angular/core';


interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}
@Component({
  selector: 'app-trainer-container',
  templateUrl: './trainer-container.component.html',
  styleUrls: ['./trainer-container.component.css']
})
export class TrainerContainerComponent {
  
  isSideNavCollapsed = false
  screenWidth = 0
  onToggleSideNav(data:SidenavToggle):void{
      this.screenWidth = data.screenWidth
      this.isSideNavCollapsed = data.collapsed
  }
}
