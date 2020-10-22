import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarSesionPageRoutingModule } from './iniciar-sesion-routing.module';

import { IniciarSesionPage } from './iniciar-sesion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarSesionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IniciarSesionPage]
})
export class IniciarSesionPageModule {}
