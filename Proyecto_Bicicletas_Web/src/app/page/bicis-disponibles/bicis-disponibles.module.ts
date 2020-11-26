import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicisDisponiblesPageRoutingModule } from './bicis-disponibles-routing.module';

import { BicisDisponiblesPage } from './bicis-disponibles.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicisDisponiblesPageRoutingModule,
    ComponentsModule,
  ],
  
  declarations: [BicisDisponiblesPage]
})
export class BicisDisponiblesPageModule {}
