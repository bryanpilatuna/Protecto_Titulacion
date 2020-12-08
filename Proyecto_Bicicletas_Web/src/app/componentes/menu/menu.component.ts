import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  noti:string="No";
  No='No';
  Si='Si';
  cont=true;
  contador=0;
  constructor(
    private router: Router,
    //private localNotifications: LocalNotifications,
    private ServicioNoti:NotificacionesService,
    //private storage: Storage
  ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    this.ServicioNoti.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      if(this.notificaciones.length==0){
        //console.log("No tiene ");
        this.noti="../../../assets/notificaciones/noti.png";
      }else{
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
    

    
    
  }

  ngOnInit() {
    
  }




}
