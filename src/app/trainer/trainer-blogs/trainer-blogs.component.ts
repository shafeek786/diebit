import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Blog, Response } from 'src/app/interface/blog-interface';



interface token {
  id: string;
}
@Component({
  selector: 'app-trainer-blogs',
  templateUrl: './trainer-blogs.component.html',
  styleUrls: ['./trainer-blogs.component.css'],
})
export class TrainerBlogsComponent implements OnInit {
  blogs: Blog[] = [];
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

  deleteBlog(blogId:string){
    this.service.deletBlog(blogId,this.decodedToken.id).subscribe((res:Response)=>{
      this.blogs = res.blogs
    })
  }
}
