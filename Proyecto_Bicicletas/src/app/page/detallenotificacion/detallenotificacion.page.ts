import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';
import { datosAlquiler } from '../../model/alquiler.interface';
import { datosBicicleta } from 'src/app/model/bicicleta.interface';
@Component({
  selector: 'app-detallenotificacion',
  templateUrl: './detallenotificacion.page.html',
  styleUrls: ['./detallenotificacion.page.scss'],
})
export class DetallenotificacionPage implements OnInit {

  tiendas:  datosTiendas;
  notificacion:Notificaciones;
  id= null;
  alquileres: datosAlquiler;
  idalquiler= null;
  idbici=null;
  bicicleta:datosBicicleta;
  fecha:any;
  fechaalquiler:any;
  fechadevolucion:any;
  cancelaran=false;
  constructor(
    private Servicio:AlquilerService,
    private route: ActivatedRoute, 
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      this.loadTodo();
    }
  }

  async loadTodo(){
    this.Service.getTodo(this.id).subscribe(notificacion => {
      
      this.notificacion = notificacion;
      this.idalquiler=this.notificacion.idtipo;


      this.Servicio.getAlquileres(this.idalquiler).subscribe((alquileres) =>{
        this.alquileres = alquileres;
        console.log(this.alquileres);
        this.fecha= new Date(this.alquileres.fecha['seconds']*1000);
        this.fechaalquiler= new Date(this.alquileres.fechaalquiler['seconds']*1000);
        this.fechadevolucion= new Date(this.alquileres.fechadevolucion['seconds']*1000);    
        this.idbici=this.alquileres.bicicleta;
        this.Servicio.getBicicleta(this.idbici).subscribe((bicicletas) =>{
          this.bicicleta = bicicletas;
        })
        this.Servicio.getTienda(this.alquileres.idtienda).subscribe((tiendas) =>{
          this.tiendas = tiendas;

        })
 
        
      })


      this.notificacion.visualizar="Si";
      this.notificacion.color="#FFFFFF";
      console.log(notificacion);
      if (this.id) {
        this.Service.updateTodo(this.notificacion , this.id).then(() => {
        });
        console.log(this.notificacion.idtienda);
      } 
      
    });
    

  }

  async saveTodo() {
    this.notificacion.visualizar="Si";
    if (this.id) {
      this.Service.updateTodo(this.notificacion , this.id).then(() => {
        this.nav.navigateForward('/notificaciones');
      });
    } 
  }

}
