import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface blog {
  title: string;
  content: string;
  author: string;
}
interface token {
  id: string;
}
@Component({
  selector: 'app-trainer-blogs',
  templateUrl: './trainer-blogs.component.html',
  styleUrls: ['./trainer-blogs.component.css'],
})
export class TrainerBlogsComponent implements OnInit {
  blogs: blog[] = [];
  decodedToken: token = jwtDecode(
    localStorage.getItem('TrainerToken') as string
  );
  constructor(private service: AuthService) {}

  ngOnInit(): void {
    console.log('blog');
    this.service.getblog(this.decodedToken.id).subscribe((res: any) => {
      this.blogs = res.blogs;
    });
  }
}
