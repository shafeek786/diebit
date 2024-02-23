import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoodService } from 'src/app/services/food.service';
import { FoodtoUserComponent } from '../foodto-user/foodto-user.component';
import { TrackerComponent } from '../tracker/tracker.component';

interface FoodData {
  _id: string;
  name: string;
  energy?: number;
  protien:number;
  carbohydrate:number;
  fat:number // Add other fields as needed
}

@Component({
  selector: 'app-addfodd',
  templateUrl: './addfodd.component.html',
  styleUrls: ['./addfodd.component.css']
})
export class AddfoddComponent implements OnInit {
  selectedTab: string = 'all';
  foodList: FoodData[] = [];
  selectedFood: FoodData | null | undefined = null; // Updated type definition
  dialogRef: any;

  constructor(private service: FoodService,
              private dialog: MatDialog,
              private dialogReff: MatDialogRef<AddfoddComponent>) {}

  ngOnInit(): void {
    this.loadFood();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.selectedFood = null;
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.service.searchFood(searchTerm).subscribe((res:any)=>{
      this.foodList = res.foodData;
    })
    // Implement search logic if needed
  }

  loadFood(): void {
    this.service.loadFood().subscribe((res: any) => {
      this.foodList = res.foodData;
      this.selectedFood = null;
    });
  }

  selectFood(id: any): void {
    console.log("Selected food id:", id);
    this.selectedFood = this.foodList.find(food => food._id === id);
    this.openFoodDetails();
  }

  openFoodDetails(): void {
    if (this.selectedFood) {
      this.dialogRef = this.dialog.open(FoodtoUserComponent, {
        width: '100%',
        data: this.selectedFood
      });
      
      this.dialogRef.afterClosed().subscribe(() => {
        this.selectedFood = null;
      });
    }
  }

  closeDialog(){
    console.log("close")
    this.dialogReff.close()
  }
}
