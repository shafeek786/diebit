import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodHistory } from './interface/food-interface';
interface foodHistory{
  name:string,
  quantity:number,
  size:number,
  calories:number
}

interface userData {
  name:string,
  weight:number
}
interface weight{
  weight: number
}
@Injectable({
  providedIn: 'root'
})
export class SharedCaloriesService {
  private consumedCaloriesSubject = new BehaviorSubject<number>(0);
  private dailyFood = new BehaviorSubject<foodHistory[]>([])
  private updatedWeight = new BehaviorSubject<weight[]>([])
  private updateUserData = new BehaviorSubject<userData>({} as userData)

  consumedCalories$: Observable<number> = this.consumedCaloriesSubject.asObservable();
  foodHistory$: Observable<foodHistory[]> = this.dailyFood.asObservable()
  weightTraker$: Observable<weight[]> = this.updatedWeight.asObservable()
  userData$: Observable<userData> = this.updateUserData.asObservable()

  updateConsumedCalories(calories: number) {
    this.consumedCaloriesSubject.next(calories);
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
