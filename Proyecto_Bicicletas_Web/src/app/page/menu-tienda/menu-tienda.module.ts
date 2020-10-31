import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTiendaPageRoutingModule } from './menu-tienda-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { MenuTiendaPage } from './menu-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTiendaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MenuTiendaPage]
})
export class MenuTiendaPageModule {}
