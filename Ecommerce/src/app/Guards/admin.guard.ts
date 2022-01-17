import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { UserService } from '../Services/user.service';
import { ClienteService } from '../Services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    // private adminService: UserService,
    private clienteService: ClienteService,
    private router: Router
  ){

  }



  canActivate():boolean {

    if (!this.clienteService.isAutenticate()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
    
  }
  
}
