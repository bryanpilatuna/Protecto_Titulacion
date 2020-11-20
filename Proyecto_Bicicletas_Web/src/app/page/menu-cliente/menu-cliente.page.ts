import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';


import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.page.html',
  styleUrls: ['./menu-cliente.page.scss'],
})
export class MenuClientePage implements OnInit {
  name: string;
  idenvio={id:"Bryan"};
  id: any;
  usuarios: User[];
  notificaciones: Notificaciones[];
  estado:string;
  noti:string="No";
  constructor(
    private authservice : AuthService, 
    private router: Router,
    private usuarioService:UsuarioService,
    private ServicioNoti:NotificacionesService,

    private alertCtrl: AlertController) {
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    if(this.id){
      this.estado = "Activo";
    
    }
   }

  ngOnInit() {
    this.usuarioService.enviarobjeto(this.id);
    
    this.authservice.getUsuario().subscribe(user => {
      //this.name = user.displayName;
    });
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

  pageperfile(){
    this.router.navigate(['profile']);
  }

  salir(){ 
    this.authservice.logout();
    this.id = null;
    this.estado = "Inactivo";
 
  }



}
