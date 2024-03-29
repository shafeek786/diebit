import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './route/app-routing/app-routing.module';
import { AdminRaoutingModule } from './route/admin-routing/admin-routing.module';
import { TrainerRoutingModule } from './route/trainer-routing/trainer-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/token-interceptor.interceptor'; 
import * as $ from 'jquery';
import 'slicknav/dist/jquery.slicknav.min.js';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './user/index/index.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './user/login/login.component';
import { OtpComponent } from './user/otp/otp.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { SignupComponent } from './user/signup/signup.component';
import { AboutComponent } from './user/about/about.component';
import { BiometricsComponent } from './user/biometrics/biometrics.component';
import { BiogComponent } from './user/biog/biog.component';
import { ContactComponent } from './user/contact/contact.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { GalleryComponent } from './user/gallery/gallery.component';
import { BodyComponent } from './user/components/body/body.component';
import { FooterComponent } from './user/components/footer/footer.component';
import { HeaderComponent } from './user/components/header/header.component';
import { SidebarComponent } from './user/components/sidebar/sidebar.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { TrackerComponent } from './user/tracker/tracker.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminAddfoodComponent } from './admin/admin-addfood/admin-addfood.component';
import { AdminBodyComponent } from './admin/admin-body/admin-body.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminManageplansComponent } from './admin/admin-manageplans/admin-manageplans.component';
import { AdminSalesreportComponent } from './admin/admin-salesreport/admin-salesreport.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminTrainersComponent } from './admin/admin-trainers/admin-trainers.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin/admin-components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-components/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin/admin-components/admin-footer/admin-footer.component';
import { TrainerHeaderComponent } from './trainer/components/trainer-header/trainer-header.component';
import { TrainerSidebarComponent } from './trainer/components/trainer-sidebar/trainer-sidebar.component';
import { TrainerFooterComponent } from './trainer/components/trainer-footer/trainer-footer.component';
import { ConfirmComponent } from './trainer/confirm/confirm.component';
import { TrainerBodyComponent } from './trainer/trainer-body/trainer-body.component';
import { TrainerContainerComponent } from './trainer/trainer-container/trainer-container.component';
import { TrainerDashboardComponent } from './trainer/trainer-dashboard/trainer-dashboard.component';
import { TrainerLoginComponent } from './trainer/trainer-login/trainer-login.component';
import { TrainerSignupComponent } from './trainer/trainer-signup/trainer-signup.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { WeightupdateComponent } from './user/weightupdate/weightupdate.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { UpdateweightComponent } from './user/updateweight/updateweight.component';
import { AddfoddComponent } from './user/addfodd/addfodd.component';
import { AdminFoodComponent } from './admin/admin-food/admin-food.component';
import { FoodtoUserComponent } from './user/foodto-user/foodto-user.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TrainerBlogsComponent } from './trainer/trainer-blogs/trainer-blogs.component';
import { TrainerAddBlogComponent } from './trainer/trainer-add-blog/trainer-add-blog.component';
import { UserBlogsComponent } from './user/user-blogs/user-blogs.component';
import { AddWorkoutComponent } from './user/add-workout/add-workout.component'; 
import { WorkoutListComponent } from './user/workout-list/workout-list.component'
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { ManagePlanComponent } from './admin/manage-plan/manage-plan.component';
import { EditPlanComponent } from './admin/edit-plan/edit-plan.component';
import { SubscriptionComponent } from './user/subscription/subscription.component';
import { ScheduleComponent } from './trainer/schedule/schedule.component';
import { TrainerprofileComponent } from './trainer/trainerprofile/trainerprofile.component';
import { AvailableSlotsComponent } from './user/available-slots/available-slots.component';
import { TrainerDetailComponent } from './user/trainer-detail/trainer-detail.component';
import { TrainerslistComponent } from './user/trainerslist/trainerslist.component';
import { SubscribedTrainerComponent } from './user/subscribed-trainer/subscribed-trainer.component';
import { UserChatComponent } from './user/user-chat/user-chat.component';
import { TrainerChatComponent } from './trainer/trainer-chat/trainer-chat.component';
import { ChatComponent } from './trainer/chat/chat.component';
import { UservideocallComponent } from './user/uservideocall/uservideocall.component';
import { TrainervideocallComponent } from './trainer/trainervideocall/trainervideocall.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { VideocallComponent } from './videocall/videocall.component'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TrainerEditBlogComponent } from './trainer/trainer-edit-blog/trainer-edit-blog.component';
import { BloguserComponent } from './user/bloguser/bloguser.component';
import { SubscribedusersComponent } from './trainer/subscribedusers/subscribedusers.component';
import { TrainerWalletComponent } from './trainer/trainer-wallet/trainer-wallet.component';
import { CheckComponent } from './user/check/check.component';
import { Sidebar2Component } from './user/components/sidebar2/sidebar2.component';
import { Sidebar3Component } from './user/components/sidebar3/sidebar3.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const config:SocketIoConfig = {url:'http://localhost:8080',options:{}}


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    OtpComponent,
    ResetpasswordComponent,
    SignupComponent,
    AboutComponent,
    BiometricsComponent,
    BiogComponent,
    ContactComponent,
    ForgetPasswordComponent,
    GalleryComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    UserDashboardComponent,
    TrackerComponent,
    AdminAddfoodComponent,
    AdminBodyComponent,
    AdminContainerComponent,
    AdminLoginComponent,
    AdminManageplansComponent,
    AdminSalesreportComponent,
    AdminUsersComponent,
    AdminTrainersComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    TrainerHeaderComponent,
    TrainerSidebarComponent,
    TrainerFooterComponent,
    ConfirmComponent,
    TrainerBodyComponent,
    TrainerContainerComponent,
    TrainerDashboardComponent,
    TrainerLoginComponent,
    TrainerSignupComponent,
    ConfirmationDialogComponent,
    WeightupdateComponent,
    DashboardComponent,
    UpdateweightComponent,
    AddfoddComponent,
    AdminFoodComponent,
    FoodtoUserComponent,
    TrainerBlogsComponent,
    TrainerAddBlogComponent,
    UserBlogsComponent,
    AddWorkoutComponent,
    WorkoutListComponent,
    AddPlanComponent,
    ManagePlanComponent,
    EditPlanComponent,
    SubscriptionComponent,
    ScheduleComponent,
    TrainerprofileComponent,
    AvailableSlotsComponent,
    TrainerDetailComponent,
    TrainerslistComponent,
    SubscribedTrainerComponent,
    UserChatComponent,
    TrainerChatComponent,
    ChatComponent,
    UservideocallComponent,
    TrainervideocallComponent,
    VideocallComponent,
    TrainerEditBlogComponent,
    BloguserComponent,
    SubscribedusersComponent,
    TrainerWalletComponent,
    CheckComponent,
    Sidebar2Component,
    Sidebar3Component,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    AdminRaoutingModule,
    NgbModule,
    TrainerRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MaterialModule,
    MatGridListModule,
    MatToolbarModule,
    ChartModule,
    HighchartsChartModule,
    FormsModule,
    BsDatepickerModule,
    DialogModule,
    SocketIoModule.forRoot(config),

  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
