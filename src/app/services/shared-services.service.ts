import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  constructor() { }
  private email!: string  

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string  {
    return this.email;
  }

 
}
