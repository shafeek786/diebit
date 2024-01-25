import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  currentUrl!:string
  constructor( private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')
   console.log("login ay=uth")
    if (token) {
      console.log("login ay=uth")

      // User is authenticated, redirect to home or another route
      this.router.navigate(['/dashboard']);
      return false; // Prevent access to the route
    } else {
      return true; // Allow access to the route for non-authenticated users
    }
  }
}
