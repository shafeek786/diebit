import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  classes = [
    { name: 'Yoga', instructor: 'Ryan Knight', image: 'assets/img/classes/classes-1.jpg' },
    { name: 'Karate', instructor: 'Kevin McCormick', image: 'assets/img/classes/classes-4.jpg' },
    { name: 'Running', instructor: 'Randy Rivera', image: 'assets/img/classes/classes-2.jpg' },
    { name: 'Dance', instructor: 'Russell Lane', image: 'assets/img/classes/classes-5.jpg' },
    { name: 'Personal Training', instructor: 'Cole Robertson', image: 'assets/img/classes/classes-3.jpg' },
    { name: 'Weight Loss', instructor: 'Ryan Scott', image: 'assets/img/classes/classes-6.jpg' },
    { name: 'Personal Training', instructor: 'Cole Robertson', image: 'assets/img/classes/classes-7.jpg' },
    { name: 'Weight Loss', instructor: 'Ryan Scott', image: 'assets/img/classes/classes-8.jpg' }
  ];
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    margin: 20,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      1000: {
        items: 3
      },
      1500: {
        items: 4
      }
    },
    nav: true,
    autoplay: true,  
    autoplayTimeout: 3000  
  };
  


  // Import necessary modules

  customOptions1: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    margin: 20,
    responsive: {
      0: {
        items: 1,
        nav: false
      }
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000
  };

  testimonials = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      image: 'assets/img/testimonial/testimonial-1.jpg',
      quoteImage: 'assets/img/testimonial/quote-left.png',
      author: 'Patrick Cortez',
      role: 'Leader'
    },
    // Add more testimonials as needed
  ];
}
