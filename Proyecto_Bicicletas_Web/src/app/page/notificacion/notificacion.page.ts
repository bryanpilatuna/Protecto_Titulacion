import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  usuarioid= null;
  constructor(
    private router: Router,
    private navCtrl:NavController,
    private alertCtrl: AlertController,
    private Serviceau: AuthService){
      var user = firebase.auth().currentUser.uid;
      this.usuarioid = user;
    }

  ngOnInit() {
  }
  //NAV
  async mensajeconfirmacionmapa() {
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

  rediperfil(){
    this.router.navigate(['profile']);
  }

  alquileresnav(){
    this.router.navigate(['formulario-alquiler']);
  }

  donacionnav(){
    this.router.navigate(['formulario-donacion']);
  }

  actividadesnav(){
    this.router.navigate(['alquiler-donacion']);

  }
  irmapa(){
    this.router.navigate(['/ubicar-tienda',this.usuarioid]);
  }

  notifinav(){
    this.router.navigate(['/notificacion']);
  }
  salir(){
    this.Serviceau.logout();
  }
}


