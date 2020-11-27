import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionesAprobarPageRoutingModule } from './donaciones-aprobar-routing.module';

import { DonacionesAprobarPage } from './donaciones-aprobar.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionesAprobarPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [DonacionesAprobarPage]
})
export class DonacionesAprobarPageModule {}
