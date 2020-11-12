import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenotificacionPageRoutingModule } from './detallenotificacion-routing.module';

import { DetallenotificacionPage } from './detallenotificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenotificacionPageRoutingModule
  ],
  declarations: [DetallenotificacionPage]
})
export class DetallenotificacionPageModule {}
