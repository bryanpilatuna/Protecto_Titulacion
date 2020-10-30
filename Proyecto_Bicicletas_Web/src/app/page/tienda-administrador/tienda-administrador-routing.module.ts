import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaAdministradorPage } from './tienda-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaAdministradorPageRoutingModule {}
