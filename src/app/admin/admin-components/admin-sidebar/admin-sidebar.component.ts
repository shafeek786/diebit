import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SidenavToggle{
  screenWidth: number
  collapsed: boolean
}
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter()
  collapsed = false
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
