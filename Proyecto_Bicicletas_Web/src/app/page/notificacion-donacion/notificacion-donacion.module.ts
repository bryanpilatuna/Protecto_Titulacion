import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionDonacionPageRoutingModule } from './notificacion-donacion-routing.module';

import { NotificacionDonacionPage } from './notificacion-donacion.page';
import { ComponentsModule } from '../../componentes/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionDonacionPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [NotificacionDonacionPage]
})
export class NotificacionDonacionPageModule {}
