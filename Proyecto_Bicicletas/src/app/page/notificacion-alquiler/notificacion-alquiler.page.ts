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
  misnotificaciones:Notificaciones[];
  id: any;
  pageActual: number= 1;
  tiendas:  datosTiendas[];

  vacio:boolean=true;
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    private Servicio:DonacionService
    ) {
      this.id = firebase.auth().currentUser.uid;
      this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
          for(let i in this.notificaciones){
            if(this.notificaciones[i].idusuario==this.id && this.notificaciones[i].tipo=="alquiler"){
              console.log("")
            }else{
              var l = this.notificaciones.indexOf( this.notificaciones[i] );
              console.log(l);
              this.notificaciones.splice(l,1); 
            }
          }
      })

      this.Service.getMisnotificacionesalqui(this.id).subscribe((misnotificaciones) =>{
        this.misnotificaciones= misnotificaciones;
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
