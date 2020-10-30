import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAdministradorPage } from './perfil-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAdministradorPageRoutingModule {}
