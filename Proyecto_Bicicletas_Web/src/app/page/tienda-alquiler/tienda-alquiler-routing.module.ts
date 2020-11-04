import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaAlquilerPage } from './tienda-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaAlquilerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaAlquilerPageRoutingModule {}
