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
import { ScheduleComponent } from 'src/app/trainer/schedule/schedule.component';
import { TrainerprofileComponent } from 'src/app/trainer/trainerprofile/trainerprofile.component';
import { ChatComponent } from 'src/app/trainer/chat/chat.component';
import { TrainervideocallComponent } from 'src/app/trainer/trainervideocall/trainervideocall.component';
import { VideocallComponent } from 'src/app/videocall/videocall.component';
import { TrainerEditBlogComponent } from 'src/app/trainer/trainer-edit-blog/trainer-edit-blog.component';

const trainerRoutes:Routes = [
  { path:'trainer/login', component:TrainerLoginComponent,canActivate:[trainerLoginGuard]},
  { path:'trainer/signup', component:TrainerSignupComponent},
  { path:'trainer/confirmpage', component:ConfirmComponent},
  { path:'trainer/videochat/:trainerId/:role', component:VideocallComponent, canActivate:[trainerAuthGuard]},
  { path:'trainer', component:TrainerContainerComponent,
    children:[
      {path:'',redirectTo:'dashboard', pathMatch:'full'},
      { path:'dashboard', component:TrainerDashboardComponent,canActivate:[trainerAuthGuard]},
      { path:'blogs', component:TrainerBlogsComponent, canActivate:[trainerAuthGuard]},
      { path: 'profile', component:TrainerprofileComponent, canActivate:[trainerAuthGuard]},
      { path:'addblog', component:TrainerAddBlogComponent, canActivate:[trainerAuthGuard]},
      { path:'scheduletime', component:ScheduleComponent, canActivate:[trainerAuthGuard]},
      { path:'chat', component:ChatComponent, canActivate:[trainerAuthGuard]},
      { path:'videocall', component:TrainervideocallComponent, canActivate:[trainerAuthGuard]},
      { path:'editblog/:blogId', component:TrainerEditBlogComponent, canActivate:[trainerAuthGuard]}
      
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(trainerRoutes)
  ]
})
export class TrainerRoutingModule { }
