import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DatosUsuario } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  noti:string="../../../assets/notificaciones/noti.png";
  No='No';
  Si='Si';
  cont=true;
  contador=0;
  mensaje:string;
  iden:any;
  usuario: DatosUsuario;
  estado:string;
  constructor(
    private router: Router,
    private localNotifications: LocalNotifications,
    private ServicioNoti:NotificacionesService,
    private storage: Storage,
    private usuarioService: UsuarioService, 
    private alertCtrl: AlertController,
    private authservice : AuthService, 

  ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    this.ServicioNoti.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      if(this.notificaciones.length==0){
        //console.log("No tiene ");
        this.noti="../../../assets/notificaciones/noti.png";
      }else{
        this.send();
        this.noti="../../../assets/notificaciones/notiactiva.png";
        //console.log('Tiene');
      }
      //this.noti="../../../assets/notificaciones/notiactiva.png";
      /*for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="../../../assets/notificaciones/notiactiva.png";
          this.send();
          this.contador=this.contador+1;
        }
      }
      if(this.contador==0){
        this.noti="../../../assets/notificaciones/noti.png";
      }*/
      
    })
    this.usuarioService.getUsuario(this.id).subscribe(usuario => {
      this.usuario = usuario;
      if(this.usuario.estado=="Inactivo"){
        //this.mensaje="El usuario esta inactivo.";
        //this.mensajeerror();
 
        this.authservice.logout();
        this.id = null;
        this.estado = "Inactivo";
        this.savef();
 
      }

    });
    

    
    
  }

  ngOnInit() {
    
  }
  savef(){
    this.storage.set('estado', this.estado);
  }


  send(){
    this.localNotifications.schedule({
      text: 'Tienes notificaciones pendientes que revisar.',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
   });

   this.localNotifications.on('click').subscribe(notification => {
    this.router.navigate(['notificacion']);
     });
  }

  //Mostrar mensaje de alerta
  async mensajeerror() {
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


}
