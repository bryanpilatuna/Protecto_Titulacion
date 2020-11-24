import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicisMantenimientoPageRoutingModule } from './bicis-mantenimiento-routing.module';

import { BicisMantenimientoPage } from './bicis-mantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicisMantenimientoPageRoutingModule
  ],
  declarations: [BicisMantenimientoPage]
})
export class BicisMantenimientoPageModule {}
