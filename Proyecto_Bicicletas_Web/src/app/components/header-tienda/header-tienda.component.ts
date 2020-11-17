import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {NotificacionesService} from '../../services/notificaciones.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrls: ['./header-tienda.component.scss'],
})
export class HeaderTiendaComponent implements OnInit {
  noti='No';  
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
    private Servicio:AuthService,
    private notificacionesService:NotificacionesService,
    public alertController: AlertController) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
  
  }

  ngOnInit() {
    this.notificacionesService.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones= notificaciones;
      this.contador=0;
      for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="Si";
          this.contador=this.contador+1;
        }
      }
      console.log('Contador'+this.contador)
      
    })

  }

  
  redihome(){
    this.router.navigate(['/menu-tienda']);
  }

  rediperfil(){
    this.router.navigate(['/editar-tienda',this.id]);
  }
  redibicicletas(){
    this.router.navigate(['/mis-bicis']);
  }
  redidonaciones(){
    this.router.navigate(['/tienda-donacion',this.id]);
  }
  redialquileres(){
    this.router.navigate(['/tienda-alquiler',this.id]);

  }

  redinotifi(){
    this.router.navigate(['/mis-bicis']);

  }
  salir(){

    this.Servicio.logout();
  }
 

}
