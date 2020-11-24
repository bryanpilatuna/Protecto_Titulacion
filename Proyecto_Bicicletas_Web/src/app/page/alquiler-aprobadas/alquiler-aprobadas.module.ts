import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquilerAprobadasPageRoutingModule } from './alquiler-aprobadas-routing.module';

import { AlquilerAprobadasPage } from './alquiler-aprobadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquilerAprobadasPageRoutingModule
  ],
  declarations: [AlquilerAprobadasPage]
})
export class AlquilerAprobadasPageModule {}
