import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  noti:string="No";
  No='No';
  Si='Si';
  constructor(
    private router: Router,
    private ServicioNoti:NotificacionesService,
    private alertCtrl: AlertController,private Servicio:AuthService) { 
      var user = firebase.auth().currentUser.uid;
    this.id = user;
    this.ServicioNoti.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
    
      for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="Si";
          
        }
      }
    })
    
  }

  ngOnInit() {}

  rediperfil(){
    this.router.navigate(['profile']);
  }

  alquiler(){
    this.router.navigate(['formulario-alquiler']);
  }

  donacion(){
    this.router.navigate(['formulario-donacion']);
  }

  acvididades(){
    this.router.navigate(['alquiler-donacion']);

  }

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Se necesita activar la ubicación de su dispositivo para visualizar las tiendas.',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.irmapa()
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  irmapa(){
    this.router.navigate(['/ubicar-tienda',this.id]);
  }

  notifi(){
    this.router.navigate(['/notificacion']);
  }
  salir(){
    this.Servicio.logout();
  }

}
