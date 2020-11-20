import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAlquilerPageRoutingModule } from './formulario-alquiler-routing.module';

import { FormularioAlquilerPage } from './formulario-alquiler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAlquilerPageRoutingModule
  ],
  declarations: [FormularioAlquilerPage]
})
export class FormularioAlquilerPageModule {}
