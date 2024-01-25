import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrainerLoginComponent } from 'src/app/trainer/trainer-login/trainer-login.component';
import { TrainerSignupComponent } from 'src/app/trainer/trainer-signup/trainer-signup.component';
import { ConfirmComponent } from 'src/app/trainer/confirm/confirm.component';
import { TrainerContainerComponent } from 'src/app/trainer/trainer-container/trainer-container.component';
import { TrainerDashboardComponent } from 'src/app/trainer/trainer-dashboard/trainer-dashboard.component';
import { trainerLoginGuard } from 'src/app/guards/trainer-login.guard';
import { trainerAuthGuard } from 'src/app/guards/trainer-auth.guard';
import { adminauthGuard } from 'src/app/guards/adminauth.guard';
import { TrainerBlogsComponent } from 'src/app/trainer/trainer-blogs/trainer-blogs.component';
import { TrainerAddBlogComponent } from 'src/app/trainer/trainer-add-blog/trainer-add-blog.component';

const trainerRoutes:Routes = [
  { path:'trainer/login', component:TrainerLoginComponent,canActivate:[trainerLoginGuard]},
  { path:'trainer/signup', component:TrainerSignupComponent},
  { path:'trainer/confirmpage', component:ConfirmComponent},
  { path:'trainer', component:TrainerContainerComponent,
    children:[
      {path:'',redirectTo:'dashboard', pathMatch:'full'},
      { path:'dashboard', component:TrainerDashboardComponent,canActivate:[trainerAuthGuard]},
      { path:'blogs', component:TrainerBlogsComponent, canActivate:[trainerAuthGuard]},
      { path:'addblog', component:TrainerAddBlogComponent, canActivate:[trainerAuthGuard]}
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(trainerRoutes)
  ]
})
export class TrainerRoutingModule { }
