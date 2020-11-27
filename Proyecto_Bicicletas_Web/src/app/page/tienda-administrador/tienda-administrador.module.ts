import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaAdministradorPageRoutingModule } from './tienda-administrador-routing.module';

import { TiendaAdministradorPage } from './tienda-administrador.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaAdministradorPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [TiendaAdministradorPage]
})
export class TiendaAdministradorPageModule {}
