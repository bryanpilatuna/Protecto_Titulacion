import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClientePageRoutingModule } from './edit-cliente-routing.module';

import { EditClientePage } from './edit-cliente.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditClientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditClientePage]
})
export class EditClientePageModule {}
