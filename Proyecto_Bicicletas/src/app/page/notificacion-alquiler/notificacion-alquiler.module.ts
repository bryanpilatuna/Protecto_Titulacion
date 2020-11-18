import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionAlquilerPageRoutingModule } from './notificacion-alquiler-routing.module';

import { NotificacionAlquilerPage } from './notificacion-alquiler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionAlquilerPageRoutingModule
  ],
  declarations: [NotificacionAlquilerPage]
})
export class NotificacionAlquilerPageModule {}
