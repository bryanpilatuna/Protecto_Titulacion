import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionesRechazadasPageRoutingModule } from './donaciones-rechazadas-routing.module';

import { DonacionesRechazadasPage } from './donaciones-rechazadas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionesRechazadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DonacionesRechazadasPage]
})
export class DonacionesRechazadasPageModule {}
