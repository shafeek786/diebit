import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

interface ApiResponse {
  userData: UserData[];
}

interface User {
  _id: string;
  firstName: string;
  email: string;
  // ... other properties
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  isBlocked: boolean;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
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
    this.adminService.getUser().subscribe(
      (res: any) => {
        console.log(res);
        const typedResponse = res as ApiResponse;
        this.userlist = typedResponse.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error in API call:', error);
      }
    );
  }

  displayedColumns: string[] = ['name', 'email', 'mobile', 'action'];

  logout(): void {
    this.service.logout();
  }

  addUser() {
    this.router.navigate(['/adduser']);
  }

  onSearchInputChange(event: any) {
    this.adminService.userSerach(event.target.value).subscribe((res) => {
      const typedResponse = res as ApiResponse;
      console.log(typedResponse);
      this.userlist = typedResponse.userData;
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this user?' },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.adminService.userDelete(id).subscribe();
      this.loadUser();
    });
  }
  toggleBlockUser(id: any) {
    console.log(id + 'blocked');
    this.adminService.toggleBlockUser(id).subscribe((res: any) => {
      id.isBlocked = !id.isBlocked;
    });
  }
}
