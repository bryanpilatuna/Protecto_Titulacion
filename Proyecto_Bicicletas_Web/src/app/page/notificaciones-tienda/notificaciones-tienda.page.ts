import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { NotificacionesTienda}from '../../model/notificaciones.interface';
import {NotificacionesService} from '../../services/notificaciones.service';
import { DatosUsuario } from '../../model/user.interface';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones-tienda',
  templateUrl: './notificaciones-tienda.page.html',
  styleUrls: ['./notificaciones-tienda.page.scss'],
})
export class NotificacionesTiendaPage implements OnInit {
  tiendaid=null;
  pageActual: number= 1;
  contador1=0;
  contador2=0;
  Si='Si';
  No='No';
  Alquiler='Alquiler';
  Donacion='Donacion';
  fechaactual: Date = new Date();
  notificaciones:NotificacionesTienda[];
  notificaciones2:NotificacionesTienda[];
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
    private loadingController: LoadingController,
    private Service: AuthService,
    private notificacionesService:NotificacionesService) {
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

      this.notificacionesService.getUsuarios().subscribe((usuarios) =>{
        this.usuarios = usuarios;

      })

     }

  ngOnInit() {

    this.notificacionesService.getMisnotificaciones(this.tiendaid).subscribe((notificaciones) =>{
      this.notificaciones=notificaciones.filter(notificaciones=>notificaciones.visualizar=='No' &&notificaciones.tipo=='Alquiler');
    })
    this.notificacionesService.getMisnotificaciones(this.tiendaid).subscribe((notificaciones) =>{
      this.notificaciones2=notificaciones.filter(notificaciones=>notificaciones.visualizar=='No'&&notificaciones.tipo=='Donacion');
    })
  }


  async cambiarvisualizado(notifi:NotificacionesTienda,id:string){
    if(notifi.tipo=='Alquiler')   {
      const loading = await this.loadingController.create({
        message: 'Cargando....'
      });
      await loading.present();
      notifi.visualizar='Si';
      this.notificacionesService.updateNotificacion(notifi,id).then(() => {
    for (let index = 0; index < this.notificaciones.length; index++) {
      if(this.notificaciones[index].tipo=='Alquiler'){
        this.notificaciones[index].visualizar='Si';
        this.notificacionesService.updateNotificacion(this.notificaciones[index],this.notificaciones[index].id);
      }
      
    }
    //window.location.href = '/tienda-alquiler' ;
    this.router.navigate(['/tienda-alquiler']);
    loading.dismiss();
      });

    } 
    else if(notifi.tipo=='Donacion'){
      const loading = await this.loadingController.create({
        message: 'Cargando....'
      });
      await loading.present();
      notifi.visualizar='Si';
      this.notificacionesService.updateNotificacion(notifi,id).then(() => {
        for (let index = 0; index < this.notificaciones2.length; index++) {
          if(this.notificaciones2[index].tipo=='Donacion'){
            this.notificaciones2[index].visualizar='Si';
            this.notificacionesService.updateNotificacion(this.notificaciones2[index],this.notificaciones2[index].id);
          }
        }
        //window.location.href = '/tienda-donacion' ;
        this.router.navigate(['/tienda-donacion']);
        loading.dismiss();
    });
    }
  }

  aprobar(notifi:NotificacionesTienda,id:string){
    if(notifi.tipo=='Alquiler')   {
   
      notifi.visualizar='Si';
      this.notificacionesService.updateNotificacion(notifi,id).then(() => {
    for (let index = 0; index < this.notificaciones2.length; index++) {
      if(this.notificaciones2[index].tipo=='Alquiler'){
        this.notificaciones2[index].visualizar='Si';
        this.notificacionesService.updateNotificacion(this.notificaciones2[index],this.notificaciones2[index].id);
      }
      
    }
    window.location.href = '/notificaciones-tienda' ;
      });

    } 
    else if(notifi.tipo=='Donacion'){
      notifi.visualizar='Si';
      this.notificacionesService.updateNotificacion(notifi,id).then(() => {
        for (let index = 0; index < this.notificaciones.length; index++) {
          if(this.notificaciones[index].tipo=='Donacion'){
            this.notificaciones[index].visualizar='Si';
            this.notificacionesService.updateNotificacion(this.notificaciones[index],this.notificaciones[index].id);
          }
        }
        window.location.href = '/notificaciones-tienda' ;
    });
    }
  }

///////////////////////////////////

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

  this.Service.logout();
}

}
