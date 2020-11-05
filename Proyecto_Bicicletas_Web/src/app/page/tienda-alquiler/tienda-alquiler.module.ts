import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaAlquilerPageRoutingModule } from './tienda-alquiler-routing.module';

import { TiendaAlquilerPage } from './tienda-alquiler.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaAlquilerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TiendaAlquilerPage]
})
export class TiendaAlquilerPageModule {}
