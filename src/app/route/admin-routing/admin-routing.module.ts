import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from 'src/app/admin/admin-login/admin-login.component';
import { AdminContainerComponent } from 'src/app/admin/admin-container/admin-container.component';
import { AdminUsersComponent } from 'src/app/admin/admin-users/admin-users.component';
import { adminloginGuard } from 'src/app/guards/adminlogin.guard';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
import { adminauthGuard } from 'src/app/guards/adminauth.guard';
import { AdminTrainersComponent } from 'src/app/admin/admin-trainers/admin-trainers.component';
import { AdminAddfoodComponent } from 'src/app/admin/admin-addfood/admin-addfood.component';
import { AdminFoodComponent } from 'src/app/admin/admin-food/admin-food.component';

const adminRoutes:Routes = [
  { path:'admin/login', component:AdminLoginComponent,canActivate:[adminloginGuard]},
  { path:'admin', component:AdminContainerComponent,canActivate:[adminauthGuard],
    children:[
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      { path:'dashboard', component:AdminDashboardComponent},
      { path:'trainer', component:AdminTrainersComponent},
      { path: 'users', component:AdminUsersComponent},
      { path:'addfood', component:AdminAddfoodComponent},
      { path:'food', component:AdminFoodComponent}
    ]},
  
 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRaoutingModule { }
