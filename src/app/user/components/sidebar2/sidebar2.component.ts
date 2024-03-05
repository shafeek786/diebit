import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from 'src/app/trainer/components/trainer-sidebar/nav-data' 


interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}
@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component {
  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter()
  collapsed = true
  screenWidth = 0
  navData = navbarData
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth
    if(this.screenWidth <= 768){
      this.collapsed = false
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})

    }
    if(this.screenWidth > 768){
      this.collapsed = true
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})

    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }
  toggleCollapse(){
    this.collapsed =!this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(){
    this.collapsed =false
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth})

  }
}
