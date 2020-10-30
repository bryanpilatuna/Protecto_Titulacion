import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAdministradorPageRoutingModule } from './perfil-administrador-routing.module';

import { PerfilAdministradorPage } from './perfil-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAdministradorPageRoutingModule
  ],
  declarations: [PerfilAdministradorPage]
})
export class PerfilAdministradorPageModule {}
