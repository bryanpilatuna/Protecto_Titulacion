import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaDonacionPage } from './tienda-donacion.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaDonacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaDonacionPageRoutingModule {}
