import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApiResponse,
  UserData,
  statusChange,
  trainerId,
  myEvent
} from 'src/app/interface/admin-interface';

@Component({
  selector: 'app-admin-trainers',
  templateUrl: './admin-trainers.component.html',
  styleUrls: ['./admin-trainers.component.css'],
})
export class AdminTrainersComponent implements OnInit {
  constructor(
    private adminService: AdminAuthService,
    private service: AuthServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  userlist: UserData[] = [];
  dataSource = new MatTableDataSource<UserData>(this.userlist); // Use MatTableDataSource

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadUser();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadUser() {
    this.adminService.getTrainer().subscribe(
      (res: ApiResponse) => {
        console.log(res);
        this.userlist = res.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      },
      (error: ApiResponse) => {
        console.error('Error in API call:', error);
      }
    );
  }
  

  displayedColumns: string[] = ['name', 'email', 'mobile', 'status', 'action'];

  logout(): void {
    this.service.logout();
  }

  addUser() {
    this.router.navigate(['/adduser']);
  }

  onSearchInputChange(event: Event) {
    const targetValue = (event.target as HTMLInputElement)?.value;
    this.adminService.trainerSearch(targetValue).subscribe((res) => {
      const typedResponse = res as ApiResponse;
      this.userlist = typedResponse.userData;
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;
    });
  }
  onStatusChange(event: statusChange, element: trainerId) {
    // Handle the status change here
    console.log(
      `Status changed to: ${event.value} for element with id ${element._id}`
    );

    this.adminService.trainerStatusChange(element, event.value).subscribe();
  }

  toggleBlockUser(id: trainerId) {
    console.log(id + 'blockedddd');
    this.adminService.toggleBlockTrainer(id).subscribe((res) => {});
  }
}
