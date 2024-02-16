import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../service/wallet.service';
import { tokenData } from 'src/app/interface/tokenInterface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-trainer-wallet',
  templateUrl: './trainer-wallet.component.html',
  styleUrls: ['./trainer-wallet.component.css']
})
export class TrainerWalletComponent implements OnInit {
  walletBalance: number = 0; 
  walletHistory: any[] = []; 
  withdrawalForm!: FormGroup; 
  decodedToken!:tokenData
  constructor(private fb: FormBuilder,
              private walletService : WalletService) { }

  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('TrainerToken') as string)
    this.getWalletBalance()
    this.getWalletHistory()
    this.withdrawalForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      bankName: ['', Validators.required],
      accountName: ['', Validators.required],
      ifsc: ['', Validators.required]
    });
  }

  getWalletBalance(){
    this.walletService.getWalletBalance(this.decodedToken.id).subscribe((res:any)=>{
      this.walletBalance = res.walletBalance
    })
  }
  getWalletHistory(){
    this.walletService.getWalletHistory(this.decodedToken.id).subscribe((res:any)=>{
        this.walletHistory =res.walletHistory
    })
  }
  submitWithdrawalForm() {
    if (this.withdrawalForm.valid) {
      console.log(this.withdrawalForm.value);
    } else {
      this.withdrawalForm.markAllAsTouched();
    }
  }
}
