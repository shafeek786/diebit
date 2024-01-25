// sharedcalories.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedcaloriesService {
  private foodAddedSubject = new Subject<void>();
  private emailClearedSubject = new Subject<void>();
  private consumedCaloriesChangedSubject = new Subject<number>();

  foodAdded$ = this.foodAddedSubject.asObservable();
  emailCleared$ = this.emailClearedSubject.asObservable();
  consumedCaloriesChanged$ = this.consumedCaloriesChangedSubject.asObservable();

  triggerFoodAdded() {
    this.foodAddedSubject.next();
  }

  triggerEmailCleared() {
    this.emailClearedSubject.next();
  }

  updateConsumedCalories(calories: number) {
    this.consumedCaloriesChangedSubject.next(calories);
  }
}
