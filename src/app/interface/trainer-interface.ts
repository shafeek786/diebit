
export interface blog {

      title: string;
      content: string;
      author: string;
    }
  
export interface signupData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  qualification: string;
  yearofexperience: number;
  password: string;
  proPic:string
  aboutMe:string
};

export interface Trainer {
  _id:string
    firstName:string
    lastName:string
    email:string
    mobile:string
    proPic:string
    qualification:string
    yearofexperience:number
    aboutMe:string
};
  
export interface loginData {
      username: string;
      password: string;
    };
  
export interface Response {
      message: string;
    };
  
export interface trainerData {
  trainerData: Trainer
  message: string
}

export interface TrainerImage{
  image:string
}
  