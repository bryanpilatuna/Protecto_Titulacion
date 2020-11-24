import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisbicisPoraprobarPageRoutingModule } from './misbicis-poraprobar-routing.module';

import { MisbicisPoraprobarPage } from './misbicis-poraprobar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisbicisPoraprobarPageRoutingModule
  ],
  declarations: [MisbicisPoraprobarPage]
})
export class MisbicisPoraprobarPageModule {}
