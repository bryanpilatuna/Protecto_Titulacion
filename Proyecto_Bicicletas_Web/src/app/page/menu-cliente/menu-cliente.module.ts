import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuClientePageRoutingModule } from './menu-cliente-routing.module';

import { MenuClientePage } from './menu-cliente.page';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuClientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuClientePage]
})
export class MenuClientePageModule {}
