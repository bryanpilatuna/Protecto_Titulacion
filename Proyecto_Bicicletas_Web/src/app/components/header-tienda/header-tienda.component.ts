import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {NotificacionesService} from '../../services/notificaciones.service';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss'],
})
export class HeaderTiendaComponent implements OnInit {
  noti='No';  
  No='No';
  Si='Si';
  id=null;
    fechaactual: Date = new Date();
    notificaciones:NotificacionesTienda[];
    contador=0;
    notificacion:NotificacionesTienda={
    visualizar: '',
    fecha: this.fechaactual,
    tipo:'',
    idusuario: '',
    idtienda: ''

    }
  constructor(private router: Router,
    public navCtrl: NavController,
    private Servicio:AuthService,
    private notificacionesService:NotificacionesService) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
  
  }

  ngOnInit() {
    
    this.notificacionesService.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones= notificaciones;
      
      for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="Si";
        // console.log(this.notificaciones[i])
        }
      }
      
    })

  }

  
  redihome(){
    this.router.navigate(['/menu-tienda']);
  }

  rediperfil(){
    this.router.navigate(['/editar-tienda']);
  }
  redibicicletas(){
    this.router.navigate(['/mis-bicis']);
  }
  redidonaciones(){
    this.router.navigate(['/tienda-donacion']);
  }
  redialquileres(){
    this.router.navigate(['/tienda-alquiler']);
  }

  redinotifi(){
    this.router.navigate(['/notificaciones-tienda']);
      
  

  }
  salir(){

    this.Servicio.logout();
  }
 

}
