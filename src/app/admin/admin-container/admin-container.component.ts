import { Component } from '@angular/core';


interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})


export class AdminContainerComponent {

  isSideNavCollapsed = false
  screenWidth = 0
  onToggleSideNav(data:SidenavToggle):void{
      this.screenWidth = data.screenWidth
      this.isSideNavCollapsed = data.collapsed
  }
}
