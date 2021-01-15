import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alquiler-donacion',
  templateUrl: './alquiler-donacion.page.html',
  styleUrls: ['./alquiler-donacion.page.scss'],
})
export class AlquilerDonacionPage implements OnInit {
  usuarioId= null;
  constructor(
    private router: Router, 
    private Serviceau: AuthService,
    private alertCtrl: AlertController,
  ) {
    var user = firebase.auth().currentUser.uid;
    this.usuarioId = user;
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
    this.router.navigate(['/ubicar-tienda',this.usuarioId]);
  }

  notifinav(){
    this.router.navigate(['/notificacion']);
  }
  salir(){
    this.Serviceau.logout();
  }

  async mensajeconfirmacionsalir() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: '¿Seguro de cerrar sesión?',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            this.salir();
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

}
