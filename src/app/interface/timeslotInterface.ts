export interface TimeSlot {
   _id:string
    trainerId:string
    date:string
    timeSlot: string
    status:string
}

export interface TimeslotData{
    timeSlot:TimeSlot[]
    
}