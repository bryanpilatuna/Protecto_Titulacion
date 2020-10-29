import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-menu-invitado',
  templateUrl: './menu-invitado.page.html',
  styleUrls: ['./menu-invitado.page.scss'],
})
export class MenuInvitadoPage implements OnInit {
  mensaje:string;
  constructor(private alertCtrl: AlertController) { }

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
