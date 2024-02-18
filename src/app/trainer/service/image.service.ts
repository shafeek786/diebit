import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerImage, trainerData } from 'src/app/interface/trainer-interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private Router: Router) { }
      apiUrl = 'https://diebit.world/api/trainer';

     uploadProfilePic(trainerId: string, image: File): Observable<trainerData> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    return this.http.post<trainerData>(`${this.apiUrl}/uploadprofilepic?trainerId=${trainerId}`, formData);
  }
}
