import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedCaloriesService } from 'src/app/shared-calories.service';

@Component({
  selector: 'app-weightupdate',
  templateUrl: './weightupdate.component.html',
  styleUrls: ['./weightupdate.component.css']
})
export class WeightupdateComponent implements OnInit {
  constructor (
    private dialogRef: MatDialogRef<WeightupdateComponent>,
    private service: AuthServiceService,
    private sharedService: SharedCaloriesService,
    private snackBar: MatSnackBar,
    private toastr:ToastrService  // Inject MatSnackBar
  ) {}

  weightForm!: FormGroup;

  ngOnInit(): void {
    this.weightForm = new FormGroup({
      'weight': new FormControl(null),
      'unit': new FormControl(null)
    });
  }

  onSubmit() {
    interface id {
      id: string;
    }

    const dec: id = jwtDecode(localStorage.getItem('token') as string);
    this.service.updateWeight({
      id: dec.id, weight: this.weightForm.value,
      date: '',
      unit: ''
    }).subscribe((res: any) => {
      const weight = res.todayWeightRecord;
      const userData = res.userData;
      this.sharedService.updateWeight(weight);
      this.sharedService.updateUserDataTracker(userData)
  
      this.toastr.success("Weight updated");
    });
    this.dialogRef.close();
  }

  closeDialog(){
    console.log("close")
    this.dialogRef.close()
  }
}
