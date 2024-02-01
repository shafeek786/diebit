import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { WeightupdateComponent } from '../weightupdate/weightupdate.component';
import { AddfoddComponent } from '../addfodd/addfodd.component';
import { Chart } from 'chart.js/auto';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { SharedCaloriesService } from 'src/app/shared-calories.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FoodHistory, foodHistory } from 'src/app/interface/food-interface';
import { WeightHistoryData, weight } from 'src/app/interface/weight-interface';
import { WorkoutListComponent } from 'src/app/user/workout-list/workout-list.component';
import { WorkoutHistory, workout } from '../../interface/workout-interface';
import { PlanserviceService } from 'src/app/services/planservice.service';
import { SubscriptionStatus } from 'src/app/interface/plan-interface';
import { isSubscription } from 'rxjs/internal/Subscription';
interface tokenData {
  id: string;
  name: string;
  email: string;
}

interface ApiResponse {
  userData: userData;
}

interface userData {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: Date;
  height: number;
  weight: number;
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackerComponent implements OnInit {
  selectedDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  today = 'today';
  email!: string;
  decodedToken!: tokenData;
  user!: userData;
  age: number = 0;
  consumedCalories!: number;
  burnedCalories!: number;
  dailyFoodHistory: foodHistory[] = [];
  weightHistory: weight[] = [];
  WorkoutHistory: workout[] = [];
  mergedData: any[] = [];
  closeIcon: any;
  isSusbscribed!:boolean
  bmr!:number
  constructor(
    private sharedService: SharedCaloriesService,
    private dialog: MatDialog,
    private service: AuthServiceService,
    private cdr: ChangeDetectorRef,
    private planService: PlanserviceService
  ) {
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
    };
  }

   ngOnInit():void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
    this.email = this.decodedToken.email;
    this.planService.checkSubscription(this.decodedToken.id).subscribe((res:SubscriptionStatus)=>{
      this.isSusbscribed = res.isActive
      console.log("check"+ res.isActive)

      console.log("subscription: "+this.isSusbscribed)
    })
    this.getFormattedDate();
    this.getUser();
    
    console.log("subscription: "+this.isSusbscribed)
    this.service
    
      .getUsrFoodHistory(this.decodedToken.id)
      .subscribe((res: FoodHistory) => {
        this.consumedCalories = res.todayCalorieIntake;
        this.dailyFoodHistory = res.foodHistory;
        this.consumeCalories();
        this.calculateBMR();
        this.cdr.detectChanges();
        this.updateMergedData();
      });

    this.service
      .getWeightHistoryTracker(this.decodedToken.id)
      .subscribe((res: any) => {
        this.weightHistory = res.todayWeightHistory;
        this.calculateBMR();
        this.consumeCalories();
        this.updateMergedData();
        this.cdr.detectChanges();
      });

    this.service
      .getWorkoutHistory(this.decodedToken.id)
      .subscribe((res: WorkoutHistory) => {
        this.WorkoutHistory = res.workoutHistory;
        this.burnedCalories = res.burnedCalories;
        this.cdr.detectChanges();
      });

    this.sharedService.consumedCalories$.subscribe(
      (consumedCalories: number) => {
        this.consumedCalories = consumedCalories;
        this.consumeCalories();
        this.calculateBMR();
        this.cdr.detectChanges();
      }
    );
    this.sharedService.foodHistory$.subscribe((foodHistory: foodHistory[]) => {
      this.dailyFoodHistory = foodHistory;
      this.updateMergedData();
      this.cdr.detectChanges();
    });

    this.sharedService.weightTraker$.subscribe((weightHistoty: weight[]) => {
      this.weightHistory = weightHistoty;
      this.getUser();
      this.updateMergedData();
      this.cdr.detectChanges();
    });

    this.sharedService.burnedCalories$.subscribe((burnedCalories: number) => {
      this.burnedCalories = burnedCalories;
     
      this.cdr.detectChanges();
      this.createChart2();
    });
    this.sharedService.workoutHistory$.subscribe(
      (WorkoutHistory: workout[]) => {
        this.WorkoutHistory = WorkoutHistory;
        this.updateMergedData();
        this.cdr.detectChanges();
      }
    );

    this.sharedService.userData$.subscribe((userData: any) => {
      this.user = userData;
      this.consumeCalories();
      this.calculateBMR();
      this.cdr.detectChanges();
    });
  }

  checkSubscription(){
    this.planService.checkSubscription(this.decodedToken.id).subscribe((res:SubscriptionStatus)=>{
      console.log("check"+ res.isActive)
      this.isSusbscribed = res.isActive
      console.log(this.isSusbscribed)
    })
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
    this.service
      .getFoodHistorywithDate(this.decodedToken.id, this.selectedDate)
      .subscribe((res: any) => {
        this.consumedCalories = res.todayCalorieIntake;
        this.dailyFoodHistory = res.foodHistory;
        this.sharedService.updateFoodHistory(res.foodHistory);
        this.consumeCalories();
        this.calculateBMR();
        this.cdr.detectChanges();
        this.updateMergedData();
      });

    this.service
      .getWeightHistoryWithDate(this.decodedToken.id, this.selectedDate)
      .subscribe((res: any) => {
        this.weightHistory = res.todayWeightHistory;
        this.sharedService.updateWeight(res.todayWeightHistory);
        this.calculateBMR();
        this.consumeCalories();
        this.updateMergedData();
        this.cdr.detectChanges();
      });

    this.service
      .getWorkoutHistoryWithDate(this.decodedToken.id, this.selectedDate)
      .subscribe((res: WorkoutHistory) => {
        this.WorkoutHistory = res.workoutHistory;
        this.burnedCalories = res.burnedCalories;
        this.updateMergedData();
        this.cdr.detectChanges();
      });
  }

  updateMergedData() {
  
    const mergedData = [
      ...this.dailyFoodHistory,
      ...this.weightHistory,
      ...this.WorkoutHistory,
    ];
    mergedData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.mergedData = mergedData;
   
  }

  removeFoodMergedEntry(entryId: string) {
    const userId = this.decodedToken.id;
    const selectedDate = this.selectedDate;
    this.service
      .removeFoodEntry(userId, entryId, selectedDate)
      .subscribe((res: FoodHistory) => {
        this.dailyFoodHistory = res.foodHistory;
        this.createChart(this.bmr,res.todayCalorieIntake)
        this.updateMergedData();
        this.cdr.detectChanges();
      });
  }

  removeWeightMergedEntry(entryId: string) {
    const userId = this.decodedToken.id;
    const selectedDate = this.selectedDate;
    this.service
      .removeWightEntry(userId, entryId, selectedDate)
      .subscribe((res: WeightHistoryData) => {
        this.weightHistory = res.todayWeightHistory;
        this.calculateBMR()
        this.updateMergedData();
        this.cdr.detectChanges();
      });
  }

  removeWorkoutMergedEntry(entryId: string) {
    const userId = this.decodedToken.id;
    const selectedDate = this.selectedDate;
    this.service
      .removeWorkoutEntry(this.decodedToken.id, entryId, selectedDate)
      .subscribe((res: WorkoutHistory) => {
        this.burnedCalories = res.burnedCalories;
        this.WorkoutHistory = res.workoutHistory;
        this.createChart2();
        this.updateMergedData();
        this.cdr.detectChanges();
      });
  }

  getUser() {
    this.service.getUser(this.decodedToken.id).subscribe((res: any) => {
      const typedResponse = res as ApiResponse;
      this.user = typedResponse.userData;

      this.calculateAge();
      this.calculateBMR();
    });
  }

  getWeightHistory() {
    this.service
      .getWeightHistoryTracker(this.decodedToken.id)
      .subscribe((res: any) => {
        this.weightHistory = res.todayWeightHistory;
      });
  }

  calculateAge() {
    if (this.user && this.user.dateOfBirth) {
      const dateOfBirth = new Date(this.user.dateOfBirth);
      const today = new Date();
      this.age = today.getFullYear() - dateOfBirth.getFullYear();

      if (
        today.getMonth() < dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() &&
          today.getDate() < dateOfBirth.getDate())
      ) {
        this.age--;
      }
    }
  }

  calculateBMR() {
     this.bmr = this.calculateBMRValue(
      this.user.gender,
      this.user.weight,
      this.user.height,
      this.age
    );
    const cal: number = this.consumedCalories || 0;

    setTimeout(() => {
      this.createChart(this.bmr, cal);
      this.cdr.detectChanges();
    });
  }

  calculateBMRValue(
    gender: string,
    weight: number,
    height: number,
    age: number
  ): number {
    let bmr = 0;
    if (gender.toLowerCase() === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender.toLowerCase() === 'female') {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    return Math.round(bmr);
  }

  calculateConsumedBRM() {}

  updateWeight() {
    this.dialog.open(WeightupdateComponent, {
      width: '100%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }

  addFood() {
    this.dialog.open(AddfoddComponent, {
      width: '100%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }

  workoutList() {
    this.dialog.open(WorkoutListComponent, {
      width: '100%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
  destroyChart() {
    const ctx = document.getElementById('roundChart') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);

    if (chart) {
      chart.destroy();
    }
  }

  destroyChart2() {
    const ctx = document.getElementById('roundChart2') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.destroy();
    }
  }

  destroyChart3() {
    const ctx = document.getElementById('roundChart3') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.destroy();
    }
  }
  consumeCalories() {
    const cal: number = this.consumedCalories || 0;

    this.createChart2();
    this.createChart3(cal);
  }
  createChart(BMR: number, consumedCal: number): void {
    this.destroyChart();
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    const ctx = document.getElementById('roundChart') as HTMLCanvasElement;

    for (const foodItem of this.dailyFoodHistory) {
      protein += foodItem.protein || 0;
      fat += foodItem.fat || 0;
      carbs += foodItem.carbohydrates || 0;
    }

    const perGrampercentage = 100 / (protein + carbs + fat);
    protein = Math.round(protein * perGrampercentage);
    fat = Math.round(fat * perGrampercentage);
    carbs = Math.round(carbs * perGrampercentage);

    const backgroundColors = ['grey', 'grey', 'grey']; // Initial grey colors for protein, fat, and carbs

    if (protein > 0 || fat > 0 || carbs > 0) {
      // If any of the nutrient values is greater than 0, use different colors
      backgroundColors[0] = 'red'; // Set color for protein
      backgroundColors[1] = 'blue'; // Set color for fat
      backgroundColors[2] = 'rgba(26, 215, 250, 0.8)'; // Set color for carbs

      const centerText = {
        id: 'centerText',
        afterDatasetsDraw(chart: any, args: any, options: any) {
          const {
            ctx,
            chartArea: { left, right, top, bottom, width, height },
          } = chart;
          ctx.save();
          ctx.font = 'bold 18px Arial';
          const text = consumedCal;
          const textWidth = ctx.measureText(text).width;
          const textX = width / 2 - textWidth / 2;
          const textY = height / 2 + top - 5;
          ctx.fillText(text, textX, textY);
          ctx.fillText('Kcal', width / 2 - 20, height / 2 + top + 15);
          ctx.restore();
        },
      };
      const roundChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Fat', 'Carbs'],
          datasets: [
            {
              data: [protein, fat, carbs],
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Consumed',
              font: {
                size: 18,
              },
            },
          },
        },
        plugins: [centerText],
      });
    }

    const centerText = {
      id: 'centerText',
      afterDatasetsDraw(chart: any, args: any, options: any) {
        const {
          ctx,
          chartArea: { left, right, top, bottom, width, height },
        } = chart;
        ctx.save();
        ctx.font = 'bold 18px Arial';
        const text = '0';
        const textWidth = ctx.measureText(text).width;
        const textX = width / 2 - textWidth / 2;
        const textY = height / 2 + top - 5;
        ctx.fillText(text, textX, textY);
        ctx.fillText('Kcal', width / 2 - 22, height / 2 + top + 15);
        ctx.restore();
      },
    };

    const roundChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [100], // Use a single value in the dataset
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Consumed',
            font: {
              size: 18,
            },
          },
        },
        events: [], // Disable hover effects
      },
      plugins: [centerText],
    });
  }

  createChart2() {
    this.destroyChart2();

    const ctx = document.getElementById('roundChart2') as HTMLCanvasElement;
    const activity = 317;
    const bmr = this.calculateBMRValue(
      this.user.gender,
      this.user.weight,
      this.user.height,
      this.age
    );
    const centerText = {
      id: 'centerText',
      afterDatasetsDraw(chart: any, args: any, options: any) {
        const {
          ctx,
          chartArea: { left, right, top, bottom, width, height },
        } = chart;
        ctx.save();
        ctx.font = 'bold 18px Arial';
        const text = bmr;
        const textWidth = ctx.measureText(text).width;
        const textX = width / 2 - textWidth / 2;
        const textY = height / 2 + top - 5;
        ctx.fillText(text, textX, textY);
        ctx.fillText('Kcal', width / 2 - 20, height / 2 + top + 15);
        ctx.restore();
      },
    };
    const roundChart2 = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['BMR', 'Exercise', 'Activity'],
        datasets: [
          {
            data: [bmr, this.burnedCalories, activity],
            backgroundColor: [
              'rgba(186, 59, 206, 0.8)',
              'rgba(31, 170, 102, 0.8)',
              'rgba(201, 178, 46, 1)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Burned',
            font: {
              size: 18,
            },
          },
        },
      },
      plugins: [centerText],
    });
  }

  createChart3(cal: number) {
    this.destroyChart3();

    const ctx = document.getElementById('roundChart3') as HTMLCanvasElement;
    const bmr = this.calculateBMRValue(
      this.user.gender,
      this.user.weight,
      this.user.height,
      this.age
    );
    const consumedPercentage = (cal / bmr) * 100;
    const remainingPercentage = 100 - consumedPercentage;
    const centerText: {
      id: string;
      afterDatasetsDraw(chart: any, args: any, options: any): void;
    }[] = [
      {
        id: 'centerText',
        afterDatasetsDraw(chart: any, args: any, options: any) {
          const {
            ctx,
            chartArea: { left, right, top, bottom, width, height },
          } = chart;
          ctx.save();
          ctx.font = 'bold 18px Arial';

          const text = bmr - cal;
          const textWidth = ctx.measureText(text).width;
          const textX = width / 2 - textWidth / 2;
          const textY = height / 2 + top - 5;
          ctx.fillText(text, textX, textY);
          ctx.fillText('Kcal', width / 2 - 22, height / 2 + top + 15);
          ctx.restore();
        },
      },
    ];
    const roundChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [consumedPercentage, remainingPercentage],
            backgroundColor: [
              'rgba(20, 53, 37, 0.8)',
              'rgba(215, 224, 219, 0.8)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Consumed',
            font: {
              size: 18,
            },
          },
        },
        events: [], // Disable hover effects
      },
      plugins: centerText as any, // Explicitly cast centerText to 'any'
    });
  }
}
