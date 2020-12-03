import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClientePageRoutingModule } from './edit-cliente-routing.module';

import { EditClientePage } from './edit-cliente.page';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditClientePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditClientePage]
})
export class EditClientePageModule {}
