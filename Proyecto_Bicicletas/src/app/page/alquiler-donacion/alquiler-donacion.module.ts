import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquilerDonacionPageRoutingModule } from './alquiler-donacion-routing.module';

import { AlquilerDonacionPage } from './alquiler-donacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquilerDonacionPageRoutingModule
  ],
  declarations: [AlquilerDonacionPage]
})
export class AlquilerDonacionPageModule {}
