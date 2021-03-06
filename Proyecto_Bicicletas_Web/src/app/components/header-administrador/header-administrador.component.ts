import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header-administrador',
  templateUrl: './header-administrador.component.html',
  styleUrls: ['./header-administrador.component.scss'],
})
export class HeaderAdministradorComponent implements OnInit {

  constructor(private router: Router,private Servicio:AuthService) { }

  ngOnInit() {}
  redihome(){
    this.router.navigate(['menu-administrador']);
  }


  rediperfil(){
    this.router.navigate(['perfil-administrador']);
  }

  redicrearadm(){
    this.router.navigate(['registro-administrador']);
  }

  reditienda(){
    this.router.navigate(['tienda-administrador']);
  }

  rediusuario(){
    this.router.navigate(['cliente-administrador']);
  }
  salir(){
    this.Servicio.logout();
  }

}
