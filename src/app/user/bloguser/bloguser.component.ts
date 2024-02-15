import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/trainer/service/auth.service';

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
  selector: 'app-bloguser',
  templateUrl: './bloguser.component.html',
  styleUrls: ['./bloguser.component.css']
})
export class BloguserComponent {

  blogs:blog[] = []
  decodedToken:token = jwtDecode(localStorage.getItem('TrainerToken') as string)


 

}
