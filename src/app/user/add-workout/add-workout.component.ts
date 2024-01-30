import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { calories } from './calories';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { userId } from 'src/app/interface/admin-interface';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WorkoutHistory, workout } from 'src/app/interface/workout-interface';
import { SharedCaloriesService } from 'src/app/shared-calories.service';
import { TokenData } from 'src/app/interface/user-interface';

interface Activity{
    activity: string
}
@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})


export class AddWorkoutComponent implements OnInit {
  addWorkoutForm !: FormGroup
  effortLevels = ['Light', 'Moderate', 'Hard'];
  activities = ['Gym', 'Cardio', 'Cycling', 'Walking'];
  calories = calories
  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddWorkoutComponent>,
              private mainDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data:Activity,
              private service:AuthServiceService,
              private sharedService: SharedCaloriesService,
              ) { }

  ngOnInit(): void {
    this.addWorkoutForm = this.fb.group({
      activity: [this.data.activity, Validators.required], 
      effortLevel: ['Light', Validators.required],
      duration: [15, [Validators.required, Validators.min(0)]],
      calories:[0]
    });

    this.calculateCalories();
  }
  
  calculateCalories() {
    const { activity, effortLevel, duration } = this.addWorkoutForm.value;


    const selectedCalories = this.calories.find(calorie =>
      calorie.name.toLowerCase() === activity.toLowerCase() && calorie.type.toLowerCase() === effortLevel.toLowerCase()
    );

    if (selectedCalories) {
      const calculatedCalories = duration * selectedCalories.calories;
      console.log(`Calories burned: ${calculatedCalories.toFixed(2)}`);
      this.addWorkoutForm.get('calories')?.setValue(calculatedCalories.toFixed(2));
  
    }
  }
addWorkout(){
  console.log(this.addWorkoutForm.value)
  const tokenDecode: TokenData = jwtDecode(localStorage.getItem('token') as string)
  console.log(tokenDecode.id)
  this.service.addWorkout(tokenDecode.id,this.addWorkoutForm.value).subscribe((res:WorkoutHistory)=>{
    console.log("burned:"+ res.burnedCalories)
      this.sharedService.updateBurnedCalories(res.burnedCalories)
      this.sharedService.updateWorkoutHistory(res.workoutHistory)
   
  })
  this.dialogRef.close()
  this.mainDialog.closeAll()
}
}
