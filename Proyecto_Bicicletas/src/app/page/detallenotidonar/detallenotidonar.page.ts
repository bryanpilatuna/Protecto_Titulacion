import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { NavController, LoadingController } from '@ionic/angular';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { datosAlquiler } from '../../model/alquiler.interface';
import { datosDonacion } from '../../model/donacion.interface';
import { DonacionService } from '../../service/donacion.service';
import { datosBicicleta } from 'src/app/model/bicicleta.interface';
@Component({
  selector: 'app-detallenotidonar',
  templateUrl: './detallenotidonar.page.html',
  styleUrls: ['./detallenotidonar.page.scss'],
})
export class DetallenotidonarPage implements OnInit {
  notificacion:Notificaciones;
  id= null;
  tiendas:  datosTiendas;
  donaciones: datosDonacion;

  fecha:any;
  fechadonar:any;
  cancelaran=false;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private Service: NotificacionesService, 
  private Servicio:DonacionService
  ) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      this.loadTodo();
    }
  }

  async loadTodo(){

    this.Service.getTodo(this.id).subscribe(notificacion => {
      
      this.notificacion = notificacion;
      this.Servicio.getDonacionid( this.notificacion.idtipo).subscribe((donaciones) =>{
        this.donaciones = donaciones;
        this.fecha= new Date(this.donaciones.fechasolicitud['seconds']*1000);
        this.fechadonar= new Date(this.donaciones.fechadonacion['seconds']*1000);
        this.Servicio.getTienda(this.donaciones.idtienda).subscribe((tiendas) =>{
          this.tiendas = tiendas;
     
        })

      })
      this.notificacion.visualizar="Si";
      this.notificacion.color="#FFFFFF";
 
      if (this.id) {
        this.Service.updateTodo(this.notificacion , this.id).then(() => {
        });
      
      } 
    })
    
  }

}
