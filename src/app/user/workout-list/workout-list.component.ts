import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent {
  dialogref: any

  constructor(private dialog: MatDialog) {}

  openAddWorkoutDialog(activity: string) {
    // You can open your AddWorkoutComponent or handle the logic to display a dialog here
    this.dialogref = this.dialog.open(AddWorkoutComponent,{
      width: '100%',
      data: { activity }
    })
  }

}
