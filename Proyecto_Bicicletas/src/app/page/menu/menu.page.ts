import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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
    private localNotifications: LocalNotifications,
    private ServicioNoti:NotificacionesService,
    private storage: Storage,
    private alertCtrl: AlertController
    ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    if(this.id){
      this.estado = "Activo";
      this.savef();
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
    this.savef();
  }

  savef(){
    this.storage.set('estado', this.estado);
  }

}
