import { Component, Inject, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { FoodService } from 'src/app/services/food.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedCaloriesService } from 'src/app/shared-calories.service';

interface ApiResponse {
  foodData: FoodData;
}
interface FoodData {
  _id: string;
  name: string;
  energy?: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}

interface id{
  id:string
}

@Component({
  selector: 'app-foodto-user',
  templateUrl: './foodto-user.component.html',
  styleUrls: ['./foodto-user.component.css']
})
export class FoodtoUserComponent implements OnInit {
  
  doughnutChart!: Chart;
addFoodForm!:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) private data: FoodData,
               private dialogRef: MatDialogRef<FoodtoUserComponent>, 
               private mainDialog: MatDialog,
              private service:AuthServiceService,
              private caloriesService: SharedCaloriesService) {}
  selectedSize: string = "100";
  ngOnInit(): void {
    this.createDoughnutChart();
    this.addFoodForm = new FormGroup({
      'quantity' : new FormControl(),
      'size': new FormControl('null')
    })
  }

  createDoughnutChart(servingSize: number = 100): void {
    if (this.data) {
      const { protein, carbohydrate, fat } = this.data;

      const proteinPerServing = (protein || 0) * (servingSize / 100);
      const carbohydratePerServing = (carbohydrate || 0) * (servingSize / 100);
      const fatPerServing = (fat || 0) * (servingSize / 100);

      this.doughnutChart = new Chart({
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
          },
        },
        title: {
          text: this.data.name,
        },
        plotOptions: {
          pie: {
            innerSize: '70%',
            depth: 45,
            slicedOffset: 0,
            dataLabels:{
              style:{
                fontSize:'18px'
              }
            }
          },
        },
        series: [
          {
            name: 'Macronutrients',
            data: [
              { name: 'Protein', y: proteinPerServing },
              { name: 'Carbs', y: carbohydratePerServing },
              { name: 'Fat', y: fatPerServing },
            ],
          } as any,
        ],
      });
    }
  }

 
  updateChart(event: any): void {
    const servingSize = event.target.value;
    this.createDoughnutChart(parseInt(servingSize));
  }

  addFood() {
    const tokenDec: id = jwtDecode(localStorage.getItem('token') as string);
    const foodId = this.data._id;
    const userId = tokenDec.id;
    console.log("foodId is:" + foodId);
    console.log("userId:" + userId);
    console.log(this.addFoodForm.value);
  
    this.service.addFodtoUser(foodId, userId, this.addFoodForm.value).subscribe((res: any) => {
      // Assuming the API response includes updated consumed calories
      const updatedCalories = res.updatedCalories;
      const todayFoodRecords =res.foodHistory
      console.log("food check"+ res)
      this.caloriesService.updateConsumedCalories(updatedCalories); 
      this.caloriesService.updateFoodHistory(todayFoodRecords)
      this.dialogRef.close()
      this.mainDialog.closeAll()
    });
  }
}
