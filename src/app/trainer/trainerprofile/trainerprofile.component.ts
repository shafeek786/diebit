import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TokenData } from 'src/app/interface/user-interface';
import { jwtDecode } from 'jwt-decode';
import { Trainer, TrainerImage, signupData, trainerData } from 'src/app/interface/trainer-interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../service/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainerprofile',
  templateUrl: './trainerprofile.component.html',
  styleUrls: ['./trainerprofile.component.css']
})
export class TrainerprofileComponent implements OnInit{
  decodedTrianerToken!: TokenData
  trainer!: Trainer
  updateForm!: FormGroup
  showText: boolean = false;
   selectedFile: File | null = null;
   imageSrc!: string
  constructor( private service: AuthService,
                private toastr: ToastrService,
                private imageService: ImageService,
                private snackBar: MatSnackBar){}

  ngOnInit(): void {
    console.log(this.trainer)
    this.decodedTrianerToken = jwtDecode(localStorage.getItem('TrainerToken') as string)
    this.getTrainer()
   
  }

  showChangeImageText() {
    this.showText = true;
}

hideChangeImageText() {
    this.showText = false;
}

  openFileInput() {
    document.getElementById('avatarInput')?.click();
}
    onFileSelected(event: any) {
      console.log("image1")
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        console.log("image1")
        this.uploadImage();
      }
    }

  updateTrainer() {
      this.updateForm = new FormGroup({
        'firstName': new FormControl(this.trainer.firstName),
      'lastName': new FormControl(this.trainer.lastName),
      'mobileNumber': new FormControl(this.trainer.mobile),
      'email': new FormControl(this.trainer.email),
      'qualification': new FormControl(this.trainer.qualification),
      'yearofexperience': new FormControl(this.trainer.yearofexperience),
      'aboutMe': new FormControl(this.trainer.aboutMe)
      });


  
  }

  getTrainer(){
    console.log("Fetching trainer details...")
    this.service.getTrainerDetails(this.decodedTrianerToken.id).subscribe((res: trainerData) => {
      this.trainer = res.trainerData
      this.imageSrc = this.trainer.proPic[0]
      console.log("Trainer details:", this.trainer)
      this.updateTrainer();
    }, error => {
      console.error('Error fetching trainer details:', error);
    });
  }

  onSubmit(){
    this.service.updateTrainer(this.decodedTrianerToken.id,this.updateForm.value).subscribe((res:trainerData)=>{
      this.trainer = res.trainerData
      if(res.message === 'updated'){
          this.toastr.success('updated')
      }
    })
  }

  uploadImage() {
    console.log("imnage")
    if (this.selectedFile && this.decodedTrianerToken.id) {
      this.imageService.uploadProfilePic(this.decodedTrianerToken.id, this.selectedFile).subscribe((res: trainerData) => {
        if (res.message === 'File size too large. Maximum is 10MB.') {
          console.log(res.message)
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition:'top',
            horizontalPosition:'center'
          });
        }        this.trainer = res.trainerData
          this.imageSrc = this.trainer.proPic[0]
          console.log(this.imageSrc)
      });
    }
  }
}
