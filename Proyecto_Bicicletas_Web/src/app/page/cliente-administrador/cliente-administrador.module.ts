import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAdministradorPageRoutingModule } from './cliente-administrador-routing.module';

import { ClienteAdministradorPage } from './cliente-administrador.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAdministradorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClienteAdministradorPage]
})
export class ClienteAdministradorPageModule {}
