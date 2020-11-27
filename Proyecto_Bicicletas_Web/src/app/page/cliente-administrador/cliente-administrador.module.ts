import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAdministradorPageRoutingModule } from './cliente-administrador-routing.module';

import { ClienteAdministradorPage } from './cliente-administrador.page';
import { ComponentsModule } from '../../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAdministradorPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [ClienteAdministradorPage]
})
export class ClienteAdministradorPageModule {}
