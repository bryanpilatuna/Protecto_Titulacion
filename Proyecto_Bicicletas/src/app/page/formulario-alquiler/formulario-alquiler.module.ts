import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAlquilerPageRoutingModule } from './formulario-alquiler-routing.module';

import { FormularioAlquilerPage } from './formulario-alquiler.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormularioAlquilerPageRoutingModule
  ],
  declarations: [FormularioAlquilerPage]
})
export class FormularioAlquilerPageModule {}
