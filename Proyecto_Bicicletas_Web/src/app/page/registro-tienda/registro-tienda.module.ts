import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroTiendaPageRoutingModule } from './registro-tienda-routing.module';

import { RegistroTiendaPage } from './registro-tienda.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroTiendaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroTiendaPage]
})
export class RegistroTiendaPageModule {}
