import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TiendaGuard implements CanActivate {
  constructor(private AFauth : AngularFireAuth,
    private router: Router,private authSvc: AuthService ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauth.authState.pipe(map( auth => {

        if(auth){
          return true;  
        }else{
          this.router.navigate(['/iniciar-sesion']);
          return false;
        }
        // console.log(auth);
        // return false;
      }))
  }
  
}
