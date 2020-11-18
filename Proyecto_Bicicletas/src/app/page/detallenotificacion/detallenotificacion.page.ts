import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-detallenotificacion',
  templateUrl: './detallenotificacion.page.html',
  styleUrls: ['./detallenotificacion.page.scss'],
})
export class DetallenotificacionPage implements OnInit {
  notificacion:Notificaciones;
  id= null;
  constructor(
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
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.Service.getTodo(this.id).subscribe(notificacion => {
      loading.dismiss();;
      this.notificacion = notificacion;
      this.notificacion.visualizar="Si";
      this.notificacion.color="#FFFFFF";
      console.log(notificacion);
      if (this.id) {
        this.Service.updateTodo(this.notificacion , this.id).then(() => {
          loading.dismiss();
        });
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
