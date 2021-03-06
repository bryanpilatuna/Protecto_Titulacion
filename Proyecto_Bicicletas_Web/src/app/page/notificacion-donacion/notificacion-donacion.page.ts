import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../modelm/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { NavController, LoadingController } from '@ionic/angular';
import { datosTiendas } from 'src/app/model/tienda.interface';
import * as firebase from 'firebase';
import { DonacionService } from 'src/app/service/donacion.service';
@Component({
  selector: 'app-notificacion-donacion',
  templateUrl: './notificacion-donacion.page.html',
  styleUrls: ['./notificacion-donacion.page.scss'],
})
export class NotificacionDonacionPage implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  pageActual: number= 1;
  tiendas:  datosTiendas[];

  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    private Servicio:DonacionService) {
      this.id = firebase.auth().currentUser.uid;
  
      this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones.filter(notificaciones=>notificaciones.idusuario == this.id && notificaciones.tipo == 'donacion');

      })

      this.Servicio.getTiendas().subscribe((tiendas) =>{
 
        this.tiendas = tiendas;
      
      })
     }

  ngOnInit() {
  }

}
