import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { FoodService } from 'src/app/services/food.service';

interface foodData{
  name: string,
  category: string,
  energy: number,
  isBlocked: boolean
}

interface ApiResponse {
  foodData: foodData[];
}
@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit {

  constructor(private service:FoodService,
              private dialog: MatDialog ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  foodlist:foodData[] = []
  dataSource = new MatTableDataSource<foodData>(this.foodlist)

  ngOnInit(): void {
    this.loadFood()
  }

  loadFood(){
    
    this.service.loadFood().subscribe((res)=>{
      const food = res as ApiResponse
      this.foodlist = food.foodData
      console.log(res)
      this.dataSource.data = this.foodlist
      this.dataSource.paginator = this.paginator

    })
  }
  displayedColumns: string[] = ['name', 'category', 'energy', 'status','action'];
  onSearchInputChange(element:any){
    this.service.searchFood(element.target.value).subscribe((res:any)=>{
      const food  =res as ApiResponse
      this.foodlist = food.foodData
      this.dataSource.data = this.foodlist
      this.dataSource.paginator = this.paginator
    })
  }

  toggleBlockUser(element:any){
    this.service.togleBlockFood(element).subscribe((res:any)=>{
    element.isBlocked = !element.isBlocked

    })
  }

  deleteItem(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '300px',
      data:{message:"Do you want to continue"}
    })
    dialogRef.afterClosed().subscribe(()=>{
      this.service.deleteItem(id).subscribe()
      this.loadFood()
    })
   
  }
}
