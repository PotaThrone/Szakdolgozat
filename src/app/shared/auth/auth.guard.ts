import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {Role} from "../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.authService.getLoggedInUser();
    if (user) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

  getRole(): number{
    let user = this.authService.getLoggedInUser();
    if(!user?.email){
      return Role.GUEST;
    }
    if(user?.email.split('@')[0] === 'admin'){
      return Role.ADMIN;
    }
    return Role.USER;
  }
}
