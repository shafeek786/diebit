import { Component, OnInit } from '@angular/core';
import { Plan, PlanData, planApiResponse } from '../../interface/plan-interface';
import { PlanserviceService } from 'src/app/services/planservice.service';
import { tokenData } from 'src/app/interface/tokenInterface';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  subscription: Plan[] = [];
  planPrice!: number;
  planId!:string
  decodedToken!: tokenData

  constructor(private planService: PlanserviceService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.decodedToken = jwtDecode(localStorage.getItem('token') as string);
    this.loadPlan();
  }

  loadPlan() {
    this.planService.getPlan().subscribe((res: PlanData) => {
      this.subscription = res.plans;
    });
  }

  subscribe(planId: string, planPrice: number) {
    this.planPrice = planPrice; 
    this.planId = planId
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.planPrice * 100,
      name: 'Diebit',
      key: 'rzp_test_Ernm0SK2wP94Mz',
      prefill: {
        name: 'Shafeek Rahman',
        email: 'shafeek78@gmail.com',
        phone: '9387013795',
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal dismissed');
        },
      },
      handler: (response: any) => {
        console.log('Payment successful. Payment ID:', response.razorpay_payment_id);
        this.updateUser(); 
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.error', (error: any) => {
      console.error('Payment failed. Error:', error);
    });

    rzp1.open();
  }

  updateUser() {
    console.log("payment success");
    this.planService.updateUserPlan(this.decodedToken.id,this.planId).subscribe((res:planApiResponse)=>{
        if(res.message === 'success'){
          this.toastr.success("Subscribed successfully")
        }
    })

  }
}
