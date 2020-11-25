import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicisDisponiblesPage } from './bicis-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: BicisDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicisDisponiblesPageRoutingModule {}
