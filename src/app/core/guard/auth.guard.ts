import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }
  isLoggedIn: boolean;
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn = res);
    if (this.isLoggedIn) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
