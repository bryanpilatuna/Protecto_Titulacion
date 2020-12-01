import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquileresPageRoutingModule } from './alquileres-routing.module';

import { AlquileresPage } from './alquileres.page';
import { ComponentsModule } from '../../componentes/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquileresPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [AlquileresPage]
})
export class AlquileresPageModule {}
