import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AboutComponent } from 'src/app/user/about/about.component';
import { BodyComponent } from 'src/app/user/components/body/body.component';
import { ContactComponent } from 'src/app/user/contact/contact.component';
import { DashboardComponent } from 'src/app/user/dashboard/dashboard.component';
import { FoodtoUserComponent } from 'src/app/user/foodto-user/foodto-user.component';
import { ForgetPasswordComponent } from 'src/app/user/forget-password/forget-password.component';
import { GalleryComponent } from 'src/app/user/gallery/gallery.component';
import { IndexComponent } from 'src/app/user/index/index.component';
import { LoginComponent } from 'src/app/user/login/login.component';
import { OtpComponent } from 'src/app/user/otp/otp.component';
import { ResetpasswordComponent } from 'src/app/user/resetpassword/resetpassword.component';
import { SignupComponent } from 'src/app/user/signup/signup.component';
import { TrackerComponent } from 'src/app/user/tracker/tracker.component';
import { UserBlogsComponent } from 'src/app/user/user-blogs/user-blogs.component';
import { UserDashboardComponent } from 'src/app/user/user-dashboard/user-dashboard.component';



const routes: Routes =  [
  { path: '', redirectTo:'index',pathMatch:'full' },
  { path:'index', component:IndexComponent, canActivate:[LoginGuard]},
  { path: 'about', component: AboutComponent },
  { path:'blog', component: GalleryComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'signup', component: SignupComponent,canActivate:[LoginGuard]},
  { path: 'login', component:LoginComponent,canActivate:[LoginGuard]},
  { path: 'dashboard', component:UserDashboardComponent,canActivate:[authGuard],
   children: [
    {path:'', redirectTo:'body', pathMatch:'full'},
    { path:'body', component:DashboardComponent, canActivate:[authGuard]},
    { path: 'tracker', component:TrackerComponent, canActivate:[authGuard]},
    { path:'food', component:FoodtoUserComponent,canActivate:[authGuard]},
    { path:'blogs',component:UserBlogsComponent, canActivate:[authGuard]}
  ]},
  { path: 'otp', component:OtpComponent},
  { path: 'forgotpassword', component:ForgetPasswordComponent},
  { path: 'resetpassword', component:ResetpasswordComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
