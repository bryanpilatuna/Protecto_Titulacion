import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../service/notificaciones.service';
import * as firebase from 'firebase';
import { Notificaciones } from '../../model/notificaciones.interface';
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
 
    private ServicioNoti:NotificacionesService,
    private storage: Storage
  ) { 
    var user = firebase.auth().currentUser.uid;
    this.id = user;
    this.ServicioNoti.getMisnotificaciones(this.id).subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
    
      for(let i in this.notificaciones){
        if(this.notificaciones[i].visualizar=="No"){
          this.noti="Si";

        }
      }
    })
    

    
    
  }

  ngOnInit() {
    
  }


 

}
