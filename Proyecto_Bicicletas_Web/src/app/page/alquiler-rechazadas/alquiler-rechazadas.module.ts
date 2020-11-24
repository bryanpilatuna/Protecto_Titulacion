import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquilerRechazadasPageRoutingModule } from './alquiler-rechazadas-routing.module';

import { AlquilerRechazadasPage } from './alquiler-rechazadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquilerRechazadasPageRoutingModule
  ],
  declarations: [AlquilerRechazadasPage]
})
export class AlquilerRechazadasPageModule {}
