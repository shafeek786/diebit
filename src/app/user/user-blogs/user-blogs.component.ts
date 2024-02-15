import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserTrainerService } from 'src/app/services/user-trainer.service';


interface blog {
  title:string,
  content: string,
  author:string
  blogImage: string
}
interface token{
  id:string
}
@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.css']
})
export class UserBlogsComponent {
  blogs:blog[] = []
  decodedToken:token = jwtDecode(localStorage.getItem('token') as string)


  constructor(private service: UserTrainerService,
    ){}

ngOnInit(): void {
console.log("blog")
console.log(window.location.pathname);

this.service.getblog().subscribe((res:any)=>{
this.blogs = res.blogs
})
}
}
