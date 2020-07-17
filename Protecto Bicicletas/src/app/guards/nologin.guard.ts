import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private router : Router,
    private AFauth : AngularFireAuth){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauth.authState.pipe(map(auth => {

        if(isNullOrUndefined(auth)){
         
         return true;
        }else{
         this.router.navigate(['/home']);
          return false;
        }
 
       }))
  }
  
}
