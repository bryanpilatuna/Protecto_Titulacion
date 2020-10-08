import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioDonacionPageRoutingModule } from './formulario-donacion-routing.module';

import { FormularioDonacionPage } from './formulario-donacion.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormularioDonacionPageRoutingModule
  ],
  declarations: [FormularioDonacionPage]
})
export class FormularioDonacionPageModule {}
