import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallenotificacionPage } from './detallenotificacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetallenotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallenotificacionPageRoutingModule {}
