import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-invitado',
  templateUrl: './menu-invitado.page.html',
  styleUrls: ['./menu-invitado.page.scss'],
})
export class MenuInvitadoPage implements OnInit {
  mensaje:string;
  constructor(private alertCtrl: AlertController,private router: Router) { }

  ngOnInit() {
  }

  //Mostrar alert
  async mensajemostrar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async mensajeconfirmacion() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Se necesita activar la ubicación de su dispositivo para visualizar las tiendas en tiempo real.',
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
    this.router.navigate(['/ubitienda-invitado']);
  }



  notificaciones(){
    this.mensaje="Necesitas registrarte para visualizar tus notificaciones.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo perfil
  perfil(){
    this.mensaje="Necesitas registrarte para visualizar y editar tu perfil.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo mis alquileres
  misalquileres(){
    this.mensaje="Necesitas registrarte para visualizar tus alquileres y donaciones.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo alquiler
  alquiler(){
    this.mensaje="Necesitas registrarte para alquilar bicicletas.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo donacion
  donar(){
    this.mensaje="Necesitas registrarte para donar tus bicicletas.";
    this.mensajemostrar();
  }

}
