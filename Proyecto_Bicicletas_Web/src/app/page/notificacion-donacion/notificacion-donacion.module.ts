import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionDonacionPageRoutingModule } from './notificacion-donacion-routing.module';

import { NotificacionDonacionPage } from './notificacion-donacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionDonacionPageRoutingModule
  ],
  declarations: [NotificacionDonacionPage]
})
export class NotificacionDonacionPageModule {}
