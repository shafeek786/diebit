import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from 'src/app/services/auth-service.service';

interface id{
  id:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  lineChart!: Chart;

  constructor(private service:AuthServiceService) {}
  ngOnInit(): void {
   

    this.updateLineChart()
  }
  
  updateLineChart(){
    
    const dec:id = jwtDecode(localStorage.getItem('token') as string)
    this.service.getWeightHistory(dec.id).subscribe((res: any) => {
      const weightData = res.weightHistory.map((entry: any) => entry.weight);
    
      const dateData = res.weightHistory.map((entry: any) => {
        // Check if the entry has 'date' and 'weight' properties
        if ('date' in entry && 'weight' in entry) {
          const dateObject = new Date(entry.date);
          // Check if the date is valid before formatting
          if (!isNaN(dateObject.getTime())) {
            return dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
          }
        }
        return 'Invalid Date';
      });
      
      console.log('Weight Data:', weightData);
     
      console.log('Date Data:', dateData);


      this.lineChart = new Chart({
        chart: {
          type: 'line',
          renderTo: 'chart-container', // Make sure to use the correct container ID
        },
        title: {
          text: 'Weight Tracker',
        },
        xAxis: {
          title: {
            text: 'Date',
          },
          type: 'category',
          categories: dateData,
          labels: {
            formatter: function () {
              const parts = (this.value as string).split('/');
              const formattedDate = parts[1] + '/' + parts[0];
              const date = new Date(formattedDate);
              return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
            },
          },
        },
        yAxis: {
          title: {
            text: 'Weight',
          },
        },
        series: [
          {
            name: 'Weight',
            data: weightData,
          } as any,
        ],
      });


    });
    

  }

  lineChart1 = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Calories'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Days',
        data: [1, 2, 3]
      } as any
    ]
  })


   weeklyCaloriesChart = new Chart({
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Weekly Calories Consumption'
    },
    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        title: {
            text: 'Days of the Week'
        }
    },
    yAxis: {
        title: {
            text: 'Calories (kcal)'
        }
    },
    series: [
        {
            name: 'Daily Calories',
            data: [2000, 2200, 1800, 2500, 2100, 2400, 1900]
        } as any
    ]
});


}
