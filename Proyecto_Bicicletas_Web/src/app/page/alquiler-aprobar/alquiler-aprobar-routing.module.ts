import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquilerAprobarPage } from './alquiler-aprobar.page';

const routes: Routes = [
  {
    path: '',
    component: AlquilerAprobarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquilerAprobarPageRoutingModule {}
