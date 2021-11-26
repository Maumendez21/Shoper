import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private adminService: UserService,
    private router: Router
  ){

  }

  canActivate():boolean {

    if (!this.adminService.isAutenticate(['ADMIN'])) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
    
  }
  
}
