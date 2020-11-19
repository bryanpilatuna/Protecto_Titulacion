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
    this.router.navigate(['/ubitienda-invitado']);
  }



  notificaciones(){
    this.mensaje="Necesita registrarse para poder visualizar las notificaciones.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo perfil
  perfil(){
    this.mensaje="Necesita registrarse para poder visualizar y editar su perfil.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo mis alquileres
  misalquileres(){
    this.mensaje="Necesita registrarse para visualizar sus alquileres y donaciones.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo alquiler
  alquiler(){
    this.mensaje="Necesita registrarse para poder alquilar una bicicleta.";
    this.mensajemostrar();
  }

  //Mensaje de de alert en modulo donacion
  donar(){
    this.mensaje="Necesita registrarse para poder realizar una donación.";
    this.mensajemostrar();
  }

}
