import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquileresPageRoutingModule } from './alquileres-routing.module';

import { AlquileresPage } from './alquileres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquileresPageRoutingModule
  ],
  declarations: [AlquileresPage]
})
export class AlquileresPageModule {}
