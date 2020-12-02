import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionAlquilerPageRoutingModule } from './notificacion-alquiler-routing.module';

import { NotificacionAlquilerPage } from './notificacion-alquiler.page';
import { ComponentsModule } from '../../componentes/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionAlquilerPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [NotificacionAlquilerPage]
})
export class NotificacionAlquilerPageModule {}
