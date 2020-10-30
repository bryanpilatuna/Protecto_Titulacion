import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaAdministradorPageRoutingModule } from './tienda-administrador-routing.module';

import { TiendaAdministradorPage } from './tienda-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaAdministradorPageRoutingModule
  ],
  declarations: [TiendaAdministradorPage]
})
export class TiendaAdministradorPageModule {}
