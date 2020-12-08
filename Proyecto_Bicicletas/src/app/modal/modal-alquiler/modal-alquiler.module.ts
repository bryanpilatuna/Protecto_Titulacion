import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAlquilerPageRoutingModule } from './modal-alquiler-routing.module';

import { ModalAlquilerPage } from './modal-alquiler.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAlquilerPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ModalAlquilerPage]
})
export class ModalAlquilerPageModule {}
