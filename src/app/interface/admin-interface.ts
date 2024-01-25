export interface loginData {
    username: string;
    password: string;
  };

export interface Response {
    message: string;
  };

export  interface userId{
    _id:string
  }
  export  interface elementId{
    _id:string
  }

  export  interface trainerId{
    id:string
    isBlocked:boolean
  }
export  interface ApiResponse {
    userData: UserData[];
    isBlocked: boolean
    message:string
  }
  
export  interface User {
    _id: string;
    firstName: string;
    email: string;
  }
  
 export interface UserData {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    isBlocked: boolean;
  }


export interface statusChange{
  value:string
}

export interface trainerId {
  _id:string
}

export interface myEvent {
  target:{
    value:string
  }
}