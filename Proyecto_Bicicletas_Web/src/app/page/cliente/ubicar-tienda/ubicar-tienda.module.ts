import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicarTiendaPageRoutingModule } from './ubicar-tienda-routing.module';

import { UbicarTiendaPage } from './ubicar-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicarTiendaPageRoutingModule
  ],
  declarations: [UbicarTiendaPage]
})
export class UbicarTiendaPageModule {}
