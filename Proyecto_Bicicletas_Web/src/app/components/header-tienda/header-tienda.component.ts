import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss'],
})
export class HeaderTiendaComponent implements OnInit {
    id=null;
  constructor(private router: Router,private Servicio:AuthService) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
  
  }

  ngOnInit() {}
  redihome(){
    this.router.navigate(['/menu-tienda']);
  }

  rediperfil(){
    this.router.navigate(['/editar-tienda',this.id]);
  }
  redibicicletas(){
    this.router.navigate(['/mis-bicis',this.id]);
  }
  redidonaciones(){
    this.router.navigate(['/tienda-donacion',this.id]);

  }
  salir(){

    this.Servicio.logout();
  }
 

}
