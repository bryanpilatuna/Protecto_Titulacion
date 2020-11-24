import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicisNodisponiblesPageRoutingModule } from './bicis-nodisponibles-routing.module';

import { BicisNodisponiblesPage } from './bicis-nodisponibles.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicisNodisponiblesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BicisNodisponiblesPage]
})
export class BicisNodisponiblesPageModule {}
