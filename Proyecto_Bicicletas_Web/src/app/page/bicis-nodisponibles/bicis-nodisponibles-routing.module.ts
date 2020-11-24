import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicisNodisponiblesPage } from './bicis-nodisponibles.page';

const routes: Routes = [
  {
    path: '',
    component: BicisNodisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicisNodisponiblesPageRoutingModule {}
