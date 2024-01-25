import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from '../services/auth-service.service';


interface id{
  id:string
}

@Injectable({
  providedIn: 'root'
})
export class authGuard  implements CanActivate {
  currentUrl!: string;

  constructor(
    private service: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.currentUrl = this.router.url;
    const dec: id = jwtDecode(localStorage.getItem('token') as string);

    if (this.service.isLogin()) {
      if (this.service.getUserRole() === 'user') {
        return this.service.isBlocked({ id: dec.id }).pipe(
          map((res: any) => {
            console.log(res);
            if (res.isBlocked === true) {
              this.service.logout()
              this.toastr.warning('You are blocked. Please contact admin');
              return this.router.parseUrl('/login');
            } else {
              return true;
            }
          })
        );
      } else {
        this.toastr.warning('You dont have accesss. Please login as user');
        this.service.logout();
        return this.router.parseUrl('/login');
      }
    }

    return this.router.parseUrl('/login');
  }
    

};
