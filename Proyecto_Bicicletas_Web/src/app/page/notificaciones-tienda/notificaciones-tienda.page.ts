import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {NotificacionesService} from '../../services/notificaciones.service';
import { DatosUsuario } from '../../model/user.interface';

@Component({
  selector: 'app-notificaciones-tienda',
  templateUrl: './notificaciones-tienda.page.html',
  styleUrls: ['./notificaciones-tienda.page.scss'],
})
export class NotificacionesTiendaPage implements OnInit {
  tiendaid=null;
  Si='Si';
  No='No';
  Alquiler='Alquiler';
  Donacion='Donacion';
  fechaactual: Date = new Date();
  notificaciones:NotificacionesTienda[];
  usuarios:DatosUsuario[];
  notificacion:NotificacionesTienda={
  visualizar: '',
  fecha: this.fechaactual,
  tipo:'',
  idusuario: '',
  idtienda: ''
  }
  constructor(private router: Router,
    private Servicio:AuthService,
    private notificacionesService:NotificacionesService) {
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.notificacionesService.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })

     }

  ngOnInit() {

    this.notificacionesService.getMisnotificaciones(this.tiendaid).subscribe((notificaciones) =>{
      this.notificaciones= notificaciones; 
    })
  }


  cambiarvisualizado(notifi:NotificacionesTienda,id:string){
        notifi.visualizar='Si';
        this.notificacionesService.updateNotificacion(notifi,id).then(() => {
      this.router.navigate(['/tienda-alquiler',this.tiendaid]);
    });


  }

  cambiarvisualizadona(notifi:NotificacionesTienda,id:string){
    notifi.visualizar='Si';
    this.notificacionesService.updateNotificacion(notifi,id).then(() => {
  this.router.navigate(['/tienda-donacion',this.tiendaid]);
});


}

}
