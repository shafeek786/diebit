import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedServicesService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  constructor(private service: AuthServiceService,
    private router:Router,
   private toastr:ToastrService,
    private sharedService: SharedServicesService){}
otpForm !: FormGroup
private otpVAlidityDuration = 180
private timer:any
public remainingTime !:number

remainingTimer !:number
formattedTime !: String

ngOnInit(): void {
this.remainingTime = this.otpVAlidityDuration
this.updateFormattedTime()
this.startTimer()
this.otpForm = new FormGroup({
otp: new FormControl(null,Validators.required)
})
}
private startTimer(): void{
this.timer = setInterval(()=>{
this.remainingTime--
if(this.remainingTime <=0){
this.stopTimer()
}
this.updateFormattedTime()
},1000) 
}

private stopTimer(): void{
clearInterval(this.timer)
}

private resetTimer():void{
this.stopTimer()
this.remainingTime = this.otpVAlidityDuration
this.startTimer()
}

private updateFormattedTime(): void {
const minutes = Math.floor(this.remainingTime / 60);
const seconds = this.remainingTime % 60;
this.formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
onSubmit(){
interface ApiResponse{
message: string,
userStatus: string
}
if (this.otpForm.valid) {
const email = this.sharedService.getEmail();
console.log(email)
if (email) {
this.service.verifyOtp({ email, otp: this.otpForm.value.otp }).subscribe((res: object) => {
const apiResponse = res as ApiResponse;
if (apiResponse.message === 'success' && apiResponse.userStatus === 'new user') {
  this.toastr.success('OTP verified');
  this.router.navigate(['login']);
  this.resetTimer();
} else if (apiResponse.message === 'success' && apiResponse.userStatus === 'existing user') {
  this.toastr.success('OTP verified');
  this.router.navigate(['resetpassword']);
  this.resetTimer();
} else {
  this.toastr.error(apiResponse.message);
}
});
} else {
console.error('Email not available');
}
}
}
resendOtp(){
interface ApiResponse{
message: string
}
const email =this.sharedService.getEmail()
console.log(email)

this.service.resendOtp({email}).subscribe((res: object)=>{
const apiResponse = res as ApiResponse
if(apiResponse.message === 'otp has been resent, Please verify otp'){
//this.toastr.success(apiResponse.message)
}else{
//this.toastr.error(apiResponse.message)
}

})

}
ngOnDestroy(): void {
this.stopTimer()
}
}
