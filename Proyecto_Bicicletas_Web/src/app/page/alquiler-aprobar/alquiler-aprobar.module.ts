import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquilerAprobarPageRoutingModule } from './alquiler-aprobar-routing.module';

import { AlquilerAprobarPage } from './alquiler-aprobar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquilerAprobarPageRoutingModule
  ],
  declarations: [AlquilerAprobarPage]
})
export class AlquilerAprobarPageModule {}
