import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionesAprobarPage } from './donaciones-aprobar.page';

const routes: Routes = [
  {
    path: '',
    component: DonacionesAprobarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonacionesAprobarPageRoutingModule {}
