import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicisMantenimientoPageRoutingModule } from './bicis-mantenimiento-routing.module';

import { BicisMantenimientoPage } from './bicis-mantenimiento.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicisMantenimientoPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [BicisMantenimientoPage]
})
export class BicisMantenimientoPageModule {}
