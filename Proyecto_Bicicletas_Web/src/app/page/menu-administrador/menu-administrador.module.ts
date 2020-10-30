import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAdministradorPageRoutingModule } from './menu-administrador-routing.module';

import { MenuAdministradorPage } from './menu-administrador.page';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdministradorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuAdministradorPage]
})
export class MenuAdministradorPageModule {}
