import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAlquilerPageRoutingModule } from './formulario-alquiler-routing.module';

import { FormularioAlquilerPage } from './formulario-alquiler.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAlquilerPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [FormularioAlquilerPage]
})
export class FormularioAlquilerPageModule {}
