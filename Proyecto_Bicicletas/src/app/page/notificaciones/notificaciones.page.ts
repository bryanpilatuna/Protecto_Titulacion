import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController) {
     this.id = firebase.auth().currentUser.uid;
     this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
    })
    }

  ngOnInit() {
    
  }

}
