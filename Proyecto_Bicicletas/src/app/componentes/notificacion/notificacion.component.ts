import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  noti:string="No";
  No='No';
  Si='Si';
  constructor(
    private router: Router,
    private localNotifications: LocalNotifications,
    private ServicioNoti:NotificacionesService,
    private storage: Storage
  ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    

    
    
  }

  ngOnInit() {
    this.ServicioNoti.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      console.log(this.notificaciones);
      for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="Si";
          this.send();
        }
      }
    })
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

}
