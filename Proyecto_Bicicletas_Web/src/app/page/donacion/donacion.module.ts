import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionPageRoutingModule } from './donacion-routing.module';

import { DonacionPage } from './donacion.page';
import { ComponentsModule } from '../../componentes/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [DonacionPage]
})
export class DonacionPageModule {}
