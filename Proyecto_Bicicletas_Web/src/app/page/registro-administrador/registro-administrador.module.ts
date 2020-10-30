import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAdministradorPageRoutingModule } from './registro-administrador-routing.module';

import { RegistroAdministradorPage } from './registro-administrador.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RegistroAdministradorPageRoutingModule
  ],
  declarations: [RegistroAdministradorPage]
})
export class RegistroAdministradorPageModule {}
