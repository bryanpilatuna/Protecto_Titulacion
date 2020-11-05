import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaDonacionPageRoutingModule } from './tienda-donacion-routing.module';

import { TiendaDonacionPage } from './tienda-donacion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaDonacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TiendaDonacionPage]
})
export class TiendaDonacionPageModule {}
