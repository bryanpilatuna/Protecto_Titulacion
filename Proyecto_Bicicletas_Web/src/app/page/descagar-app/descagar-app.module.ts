import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescagarAppPageRoutingModule } from './descagar-app-routing.module';

import { DescagarAppPage } from './descagar-app.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescagarAppPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DescagarAppPage]
})
export class DescagarAppPageModule {}
