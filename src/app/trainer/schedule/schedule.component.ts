import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TokenData } from 'src/app/interface/user-interface';
import { TimeschedullerService } from '../service/timescheduller.service';
import { TimeslotData } from 'src/app/interface/timeslotInterface';
import { TimeSlot } from '../../interface/timeslotInterface';
import { trainerId } from '../../interface/admin-interface';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent  implements OnInit {
  bsConfig!: Partial<BsDatepickerConfig>;
  selectedDate: Date = new Date();
  selectedTimeSlot!: string
  decodedTrainerToken!:TokenData
  timeSlot:TimeSlot[] = []

  constructor(private timeScheduleService: TimeschedullerService){}
  ngOnInit(): void {
    this.decodedTrainerToken = jwtDecode(localStorage.getItem('TrainerToken') as string)
      this.getFormattedDate()
      this.getTimeSlot()
      console.log("time check")
  }
  getFormattedDate(): string {
    const today = new Date();
    const selected = new Date(this.selectedDate);

    if (
      selected.getFullYear() === today.getFullYear() &&
      selected.getMonth() === today.getMonth() &&
      selected.getDate() === today.getDate()
    ) {
      return 'Today';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return this.selectedDate.toLocaleDateString();
    }
  }

  changeDate(offset: number) {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate() + offset
    );
}

getTimeSlot(){
  console.log("time check")
  this.timeScheduleService.getSlot(this.decodedTrainerToken.id,this.selectedDate).subscribe((res:any)=>{
    this.timeSlot = res.timeSlot
    console.log("time check")
  })
}
  onSubmit(){
    console.log(this.selectedTimeSlot)
    this.timeScheduleService.addSlot(this.decodedTrainerToken.id,this.selectedDate,this.selectedTimeSlot).subscribe((res:TimeslotData)=>{
        this.timeSlot = res.timeSlot
        console.log(this.timeSlot)
       
    })
    console.log(this.timeSlot.length)
  }

  cancelSlot(slotId: string) {
    const trainerId = this.decodedTrainerToken.id
    this.timeScheduleService.cancelSlot(slotId,trainerId).subscribe((res:TimeslotData)=>{
      this.timeSlot = res.timeSlot
    })
  }

}
