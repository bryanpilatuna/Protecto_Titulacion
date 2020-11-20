import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicarTiendaPage } from './ubicar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: UbicarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicarTiendaPageRoutingModule {}
