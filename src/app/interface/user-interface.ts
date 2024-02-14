// user-interface.ts
export interface UserData {
  dateOfBirth: Date;
  gender: string; // Corrected spelling to 'gender'
  weight: number;
}

export interface UserId {
  id: string;
}

export interface UpdateProfileData {
  id: string;
  userData: UserData;
}

export interface UserSignupData {
  name: string;
  mobileNumber: number;
  email: string;
  passWord: string; // Corrected spelling to 'passWord'
}

export interface TokenData {
  id: string;
  name: string;
  email: string;

}


export interface OtpData{
  otp:number
  email:string
}

export interface ResetPassword{
  password:string
  email:string
}

export interface ResendOtp {
  email:string

}

export interface UserInterface {
  _id:string
  name:string
  email:string
  mobile: number
  isOnline:string
  proPic: string,
  unreadMessageCount : number
}

export interface ApiResponse {
  message:string
  userData: UserInterface[];
}

