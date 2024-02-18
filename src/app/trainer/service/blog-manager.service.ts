import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, Response, ResponseById } from 'src/app/interface/blog-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogManagerService {
  apiUrl = 'https://diebit.world/api/trainer';
  constructor(private http: HttpClient,
              ) { }

  getBlogById(blogId:string):Observable<ResponseById>{
    const params = new HttpParams().set('blogId', String(blogId))
    return this.http.get<ResponseById>(this.apiUrl+'/getblogbyid',{ params})

  }

  updateBlogwithImage(id: string, data: Blog,file:File): Observable<Response> {
    console.log(id)
    const formData = new FormData();
    formData.append('id', id);
    formData.append('data', JSON.stringify(data));
    formData.append('image', file, file.name);
    return this.http.post<Response>(`${this.apiUrl}/updateblogwithimage`,  formData );
  }
  updateBlog(id: string, data: Blog): Observable<Response> {
   
    return this.http.post<Response>(`${this.apiUrl}/updateblog`,  {id,data} );
  }
}
