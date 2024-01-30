import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodHistory } from './interface/food-interface';
import { weight } from './interface/weight-interface';
import { foodHistory } from './interface/food-interface';
import { workout, WorkoutHistory } from './interface/workout-interface';

interface userData {
  name:string,
  weight:number
}

@Injectable({
  providedIn: 'root'
})
export class SharedCaloriesService {
  private consumedCaloriesSubject = new BehaviorSubject<number>(0);
  private burnedCalories = new BehaviorSubject<number>(0)
  private workoutHistory = new BehaviorSubject<workout[]>([])
  private dailyFood = new BehaviorSubject<foodHistory[]>([])
  private updatedWeight = new BehaviorSubject<weight[]>([])
  private updateUserData = new BehaviorSubject<userData>({} as userData)

  consumedCalories$: Observable<number> = this.consumedCaloriesSubject.asObservable();
  burnedCalories$ : Observable<number> = this.burnedCalories.asObservable()
  workoutHistory$ : Observable<workout[]> = this.workoutHistory.asObservable()
  foodHistory$: Observable<foodHistory[]> = this.dailyFood.asObservable()
  weightTraker$: Observable<weight[]> = this.updatedWeight.asObservable()
  userData$: Observable<userData> = this.updateUserData.asObservable()

  updateConsumedCalories(calories: number) {
    this.consumedCaloriesSubject.next(calories);
  }

  updateBurnedCalories(calories:number){
    this.burnedCalories.next(calories)
  }

 updateWorkoutHistory(data:workout[]){
  this.workoutHistory.next(data)
 }
  updateFoodHistory(data:foodHistory[]) {
    this.dailyFood.next(data)
  }

  updateWeight(weight: weight[]) {
    this.updatedWeight.next(weight);
  }
  updateUserDataTracker(userData:userData) {
    this.updateUserData.next(userData)
  }
  
}
