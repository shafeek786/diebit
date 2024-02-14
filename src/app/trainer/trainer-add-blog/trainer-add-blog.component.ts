import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface trianerData {
  id:string
}

interface blog {
  title: string;
  content: string;
  author: string;
}

interface response{
  message:string
}

@Component({
  selector: 'app-trainer-add-blog',
  templateUrl: './trainer-add-blog.component.html',
  styleUrls: ['./trainer-add-blog.component.css']
})
export class TrainerAddBlogComponent {
  blogForm!: FormGroup;
  selectedFile!: File
  decodedToken:trianerData = jwtDecode(localStorage.getItem('TrainerToken') as string)
  constructor(private fb: FormBuilder, 
            private service:AuthService,
            private toastr: ToastrService,
            private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      author: ['', [Validators.required]],
      image: ['',]
    });
  }

  onFileSelected(event: any) {
    console.log("image1")
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log("image1")
      
    }
  }
  onSubmit() {
    if (this.blogForm.valid) {
      const formData = this.blogForm.value;
      // Add logic to send data to your backend or perform other actions
      console.log(formData);
      this.service.addBlog(this.decodedToken.id, formData,this.selectedFile).subscribe({
        next: (res: response) => {
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
    } else {
      // Handle form validation errors
      console.log('Form is not valid');
    }
  }
}
