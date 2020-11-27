import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionesAprobadasPageRoutingModule } from './donaciones-aprobadas-routing.module';

import { DonacionesAprobadasPage } from './donaciones-aprobadas.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionesAprobadasPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [DonacionesAprobadasPage]
})
export class DonacionesAprobadasPageModule {}
