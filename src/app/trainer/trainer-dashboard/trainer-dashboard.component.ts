import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from 'src/app/interface/user-interface';
import { AuthService } from '../service/auth.service';
import { tokenData } from 'src/app/interface/tokenInterface';
import { jwtDecode } from 'jwt-decode';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {
  userlist: any
  dataSource = new MatTableDataSource<UserData>();
  decodedToken!: tokenData;

  constructor(private service: AuthService) { }

  displayedColumns: string[] = ['name', 'email', 'mobile'];

  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('TrainerToken') as string);
    this.getUser();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onSearchInputChange(event: any) {
    this.service.getSubscribedUserSearch(this.decodedToken.id, event.target.value).subscribe((res:any)=>{
      this.userlist = res.userData;
      console.log(this.userlist);
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;

    })
  }

  getUser() {
    this.service.getSubscribedUser(this.decodedToken.id).subscribe((res: any) => {
      this.userlist = res.userData;
      console.log(this.userlist);
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;
    });
  }

}
