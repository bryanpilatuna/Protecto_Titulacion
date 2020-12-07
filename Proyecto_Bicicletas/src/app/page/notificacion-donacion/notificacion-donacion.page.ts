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
  pageActual: number= 1;
  tiendas:  datosTiendas[];
  vacio:boolean=true;
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    private Servicio:DonacionService) {
      this.id = firebase.auth().currentUser.uid;
  
      this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
        for(let i in this.notificaciones){
          if(this.notificaciones[i].idusuario==this.id && this.notificaciones[i].tipo=="donacion" ){
            console.log("")
          }else{
            var l = this.notificaciones.indexOf( this.notificaciones[i] );
            console.log(l);
            this.notificaciones.splice(l,1); 
          }
      }
      })
      this.Service.getMisnotificacionesdona(this.id).subscribe((misnotificaciones) =>{
        if( misnotificaciones.length==0){
          this.vacio=true;
        }else{
          this.vacio=false;
        }
      })
      this.Servicio.getTiendas().subscribe((tiendas) =>{
 
        this.tiendas = tiendas;
      
      })
     }

  ngOnInit() {
  }

}
