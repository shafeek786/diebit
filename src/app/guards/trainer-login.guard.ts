import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class trainerLoginGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('TrainerToken');
    console.log("trainer auth");

    if (token) {
      this.router.navigate(['trainer/dashboard']);
      return false;
    } else {
      // Trainer token is not available, redirect to trainer dashboard
    return  true
    }
  }
}
