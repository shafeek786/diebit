import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from '../../interface/trainer-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BlogManagerService } from '../service/blog-manager.service';
import { Blog, Response, ResponseById } from 'src/app/interface/blog-interface';
interface trianerData {
  id:string
}

interface response{
  message:string
}

@Component({
  selector: 'app-trainer-edit-blog',
  templateUrl: './trainer-edit-blog.component.html',
  styleUrls: ['./trainer-edit-blog.component.css']
})
export class TrainerEditBlogComponent implements OnInit {
  blogForm!: FormGroup
  blogId!: string
  selectedFile!:File
  decodedToken:trianerData = jwtDecode(localStorage.getItem('TrainerToken') as string)
  blog!:Blog
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AuthService,
              private toastr: ToastrService,
              private blogService: BlogManagerService,
              private fb:FormBuilder){}

  ngOnInit(): void {
      this.blogId = this.route.snapshot.paramMap.get('blogId') || ''
      this.getBlog()
      
  }

 
  initForm() {
    console.log(this.blog.title)
    this.blogForm = this.fb.group({
      title: [this.blog.title, [Validators.required, Validators.maxLength(100)]],
      content: [this.blog.content, [Validators.required]],
      author: [this.blog.author, [Validators.required]],
      image: [this.blog.blogImage]
    });
  }

  onFileSelected(event: any) {
    console.log("image1")
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log("image1")
      
    }
  }
  getBlog() {
    this.blogService.getBlogById(this.blogId).subscribe((res: ResponseById) => {
        this.blog = res.blog;
        console.log(this.blog); // Check the entire blog object
        console.log(this.blog.title); // Check specifically the title
        this.initForm(); // Call initForm() after getting the blog data
    });
}


  onSubmit() {
    if (this.blogForm.valid) {
      const formData = this.blogForm.value;
   
      if(this.selectedFile){
        this.blogService.updateBlogwithImage(this.blogId, formData,this.selectedFile).subscribe({
          next: (res: Response) => {
            if (res.message === 'Blog post created successfully') {
              this.toastr.success('Blog post created successfully');
              this.router.navigate(['trainer/blogs']);
            }
          },
          error: (err) => {
            console.error('Error adding blog post:', err);
            this.toastr.error('Failed to create blog post');
          }
        })
      }else{
        this.blogService.updateBlog(this.blogId, formData).subscribe({
          next: (res: Response) => {
            if (res.message === 'Blog post created successfully') {
              this.toastr.success('Blog post created successfully');
              this.router.navigate(['trainer/blogs']);
            }
          },
          error: (err) => {
            console.error('Error adding blog post:', err);
            this.toastr.error('Failed to create blog post');
          }
        })
      }
       
      
    
    } else {
      // Handle form validation errors
      console.log('Form is not valid');
    }
  }

}
