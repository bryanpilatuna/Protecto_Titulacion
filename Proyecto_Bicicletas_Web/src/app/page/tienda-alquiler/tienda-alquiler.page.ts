import { Component, OnInit } from '@angular/core';
import { datosAlquiler } from '../../model/alquiler.interface';
import { DatosUsuario } from '../../model/user.interface';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tienda-alquiler',
  templateUrl: './tienda-alquiler.page.html',
  styleUrls: ['./tienda-alquiler.page.scss'],
})
export class TiendaAlquilerPage implements OnInit {
  tiendaid=null;
  alquileres:datosAlquiler[];
  usuarios:DatosUsuario[];
 

  

  constructor(private router: Router,
    private alertCtrl: AlertController,
    private Service: AuthService,) { 
      var user = firebase.auth().currentUser.uid;
      this.tiendaid = user;

     
    }

  ngOnInit() {
  

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

  this.Service.logout();
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
