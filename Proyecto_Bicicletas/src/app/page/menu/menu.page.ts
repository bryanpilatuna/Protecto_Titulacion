import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.interface';
import { UsuarioService } from '../../service/usuario.service';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
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
  constructor(
    private authservice : AuthService, 
    private router: Router,
    private usuarioService:UsuarioService,
    private localNotifications: LocalNotifications,
    private ServicioNoti:NotificacionesService
    ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    ServicioNoti.getTodos();
    this.ServicioNoti.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      
      for(let i in this.notificaciones){
        if(this.notificaciones[i].idusuario==this.id || this.notificaciones[i].visualizar=="No"){
          this.send();
        }
      }
    })
    
  }

  ngOnInit() {
    this.usuarioService.enviarobjeto(this.id);
    
    this.authservice.getUsuario().subscribe(user => {
      //this.name = user.displayName;
    });
  }

  
  send(){
    this.localNotifications.schedule({
      text: 'Tienes notificaciones pendientes que revisar.',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
   });

   this.localNotifications.on('click').subscribe(notification => {
    this.router.navigate(['notificaciones']);
     });
  }
  pageperfile(){
    this.router.navigate(['profile']);
  }
  salir(){
   
    this.authservice.logout();
    this.id = null;
  }

}
