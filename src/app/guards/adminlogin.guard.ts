import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class adminloginGuard implements CanActivate{
  constructor(private service:AdminAuthService,
              private toastr: ToastrService,
              private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token =localStorage.getItem('adminToken')
    if(token){
      this.router.navigate(['admin/dashboard'])
      return false
    }else{
      return true
    }
  }
};
