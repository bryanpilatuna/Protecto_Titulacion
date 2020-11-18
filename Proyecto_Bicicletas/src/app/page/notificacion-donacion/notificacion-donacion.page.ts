import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
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
  tiendas:  datosTiendas[];
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    private Servicio:DonacionService) {
      this.id = firebase.auth().currentUser.uid;
      console.log(this.id);
      this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
      console.log(this.notificaciones);
      })

      this.Servicio.getTiendas().subscribe((tiendas) =>{
        console.log(tiendas[0].id);
        this.tiendas = tiendas;
      
      })
     }

  ngOnInit() {
  }

}
