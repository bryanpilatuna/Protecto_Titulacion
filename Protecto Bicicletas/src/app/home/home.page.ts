import { Component } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: any;
  constructor(private AFauth : AngularFireAuth,public authservice : AuthService, public router: Router) {
    this.AFauth.authState.subscribe(Usuario=>{
      console.log( 'Estado del usuario: ', Usuario.email);
      this.usuario = Usuario.email;
    })
  }
  Onlogout(){
    this.authservice.logout();
  }
  perfil()
  {
    this.router.navigate(['/perfil']);
  }

}
