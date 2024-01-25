import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/trainer/service/auth.service';

interface blog {
  title:string,
  content: string,
  author:string
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
  decodedToken:token = jwtDecode(localStorage.getItem('TrainerToken') as string)


  constructor(private service: AuthService,
    ){}

ngOnInit(): void {
console.log("blog")
this.service.getblog(this.decodedToken.id).subscribe((res:any)=>{
this.blogs = res.blogs
})
}
}
