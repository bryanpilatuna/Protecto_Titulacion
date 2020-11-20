import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioDonacionPageRoutingModule } from './formulario-donacion-routing.module';

import { FormularioDonacionPage } from './formulario-donacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioDonacionPageRoutingModule
  ],
  declarations: [FormularioDonacionPage]
})
export class FormularioDonacionPageModule {}
