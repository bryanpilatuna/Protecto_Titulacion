import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteAdministradorPage } from './cliente-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteAdministradorPageRoutingModule {}
