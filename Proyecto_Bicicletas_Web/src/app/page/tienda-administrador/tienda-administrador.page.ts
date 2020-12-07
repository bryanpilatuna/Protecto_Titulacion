import { Component, OnInit } from '@angular/core';
import { Tienda } from '../../model/tienda.interface';
import { AdministradorService } from '../../services/administrador.service';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tienda-administrador',
  templateUrl: './tienda-administrador.page.html',
  styleUrls: ['./tienda-administrador.page.scss'],
})
export class TiendaAdministradorPage implements OnInit {
  tiendas: Tienda[];
  pageActual: number= 1;
  constructor(private Service: AdministradorService,private router: Router,private Servicio:AuthService) {
    this.Service.getTiendas().subscribe((tiendas) =>{
 
      this.tiendas = tiendas;
    })
   }

  ngOnInit() {
  }
  buscar(busquedatienda){   
    this.Service.busqueda(busquedatienda.value).subscribe((tiendas) =>{
      this.tiendas = tiendas;
    })
  }

  
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
