import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { datosTiendas } from 'src/app/model/tienda.interface';
import { AlquilerService } from 'src/app/service/alquiler.service';
@Component({
  selector: 'app-detallenotificacion',
  templateUrl: './detallenotificacion.page.html',
  styleUrls: ['./detallenotificacion.page.scss'],
})
export class DetallenotificacionPage implements OnInit {
  tienda:  datosTiendas;
  notificacion:Notificaciones;
  id= null;
  constructor(
    private Servicio:AlquilerService,
    private route: ActivatedRoute, 
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      this.loadTodo();
    }
  }

  async loadTodo(){
    this.Service.getTodo(this.id).subscribe(notificacion => {
      this.notificacion = notificacion;
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
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
    if (this.id) {
      this.Service.updateTodo(this.notificacion , this.id).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/notificaciones');
      });
    } else {
      this.Service.addTodo(this.notificacion).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

}
