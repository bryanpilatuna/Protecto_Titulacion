import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionesAprobadasPageRoutingModule } from './donaciones-aprobadas-routing.module';

import { DonacionesAprobadasPage } from './donaciones-aprobadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionesAprobadasPageRoutingModule
  ],
  declarations: [DonacionesAprobadasPage]
})
export class DonacionesAprobadasPageModule {}
