import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquilerAprobadasPageRoutingModule } from './alquiler-aprobadas-routing.module';

import { AlquilerAprobadasPage } from './alquiler-aprobadas.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquilerAprobadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AlquilerAprobadasPage]
})
export class AlquilerAprobadasPageModule {}
