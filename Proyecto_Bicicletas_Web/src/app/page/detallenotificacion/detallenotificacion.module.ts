import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenotificacionPageRoutingModule } from './detallenotificacion-routing.module';

import { DetallenotificacionPage } from './detallenotificacion.page';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenotificacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetallenotificacionPage]
})
export class DetallenotificacionPageModule {}
