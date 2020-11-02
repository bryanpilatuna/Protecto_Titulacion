import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisBicisPageRoutingModule } from './mis-bicis-routing.module';

import { MisBicisPage } from './mis-bicis.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisBicisPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisBicisPage]
})
export class MisBicisPageModule {}
