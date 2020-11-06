import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAdministradorPageRoutingModule } from './perfil-administrador-routing.module';

import { PerfilAdministradorPage } from './perfil-administrador.page';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAdministradorPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [PerfilAdministradorPage]
})
export class PerfilAdministradorPageModule {}
