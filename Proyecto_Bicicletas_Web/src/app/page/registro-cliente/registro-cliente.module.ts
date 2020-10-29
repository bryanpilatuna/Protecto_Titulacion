import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroClientePageRoutingModule } from './registro-cliente-routing.module';

import { RegistroClientePage } from './registro-cliente.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroClientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroClientePage]
})
export class RegistroClientePageModule {}
