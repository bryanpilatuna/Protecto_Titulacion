import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { NavController, LoadingController } from '@ionic/angular';
import { datosTiendas } from 'src/app/model/tienda.interface';
import * as firebase from 'firebase';
import { DonacionService } from 'src/app/service/donacion.service';
@Component({
  selector: 'app-notificacion-alquiler',
  templateUrl: './notificacion-alquiler.page.html',
  styleUrls: ['./notificacion-alquiler.page.scss'],
})
export class NotificacionAlquilerPage implements OnInit {
  notificaciones: Notificaciones[];
  id: any;
  tiendas:  datosTiendas[];
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    private Servicio:DonacionService
    ) {
      this.id = firebase.auth().currentUser.uid;
      this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      
      })

      this.Servicio.getTiendas().subscribe((tiendas) =>{
        
        this.tiendas = tiendas;
      
      })
     }

  ngOnInit() {
  }

}
