import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../../model/notificaciones.interface';
import { NotificacionesService } from '../../service/notificaciones.service';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificaciones: Notificaciones[];
  constructor(
    private nav: NavController, 
    private Service: NotificacionesService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.Service.getTodos().subscribe((notificaciones) =>{
      this.notificaciones = notificaciones;
    })
  }

}
