import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesTiendaPageRoutingModule } from './notificaciones-tienda-routing.module';

import { NotificacionesTiendaPage } from './notificaciones-tienda.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesTiendaPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [NotificacionesTiendaPage]
})
export class NotificacionesTiendaPageModule {}
