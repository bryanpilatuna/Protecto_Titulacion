import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAlquileresPageRoutingModule } from './mis-alquileres-routing.module';

import { MisAlquileresPage } from './mis-alquileres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAlquileresPageRoutingModule
  ],
  declarations: [MisAlquileresPage]
})
export class MisAlquileresPageModule {}
