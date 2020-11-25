import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionesAprobadasPage } from './donaciones-aprobadas.page';

const routes: Routes = [
  {
    path: '',
    component: DonacionesAprobadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonacionesAprobadasPageRoutingModule {}
