import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenotidonarPageRoutingModule } from './detallenotidonar-routing.module';

import { DetallenotidonarPage } from './detallenotidonar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenotidonarPageRoutingModule
  ],
  declarations: [DetallenotidonarPage]
})
export class DetallenotidonarPageModule {}
