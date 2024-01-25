import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class adminauthGuard implements CanActivate {
  constructor(private service: AdminAuthService,
              private router: Router,
              private toastr: ToastrService) {}
          
    canActivate(route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if(this.service.isLogin()){
          console.log("true")
          return true;
    } else {
      // User is not authenticated, redirect to login page
      this.toastr.error('Unauthorized access. Please log in.');
      return this.router.createUrlTree(['/trainer/login']);
    }
        
    }

};
