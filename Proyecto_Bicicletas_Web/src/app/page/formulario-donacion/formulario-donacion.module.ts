import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioDonacionPageRoutingModule } from './formulario-donacion-routing.module';

import { FormularioDonacionPage } from './formulario-donacion.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioDonacionPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [FormularioDonacionPage]
})
export class FormularioDonacionPageModule {}
