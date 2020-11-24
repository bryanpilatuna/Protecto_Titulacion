import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicisMantenimientoPage } from './bicis-mantenimiento.page';

const routes: Routes = [
  {
    path: '',
    component: BicisMantenimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicisMantenimientoPageRoutingModule {}
