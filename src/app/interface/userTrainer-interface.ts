import { trainerData } from './trainer-interface';
export interface TrainerList{
    message:string
    trainerData:Trainer[]
}

export interface Trainer{
[x: string]: any
    _id:string
    firstName:string
    lastName:string
    email:string
    mobile:string
    proPic:string
    qualification:string
    yearofexperience:number
    aboutMe:string
}

export interface TrainerById{
    message:string
    trainerData:Trainer
}

export interface SubscribedTrainer{
    trainer: string
}