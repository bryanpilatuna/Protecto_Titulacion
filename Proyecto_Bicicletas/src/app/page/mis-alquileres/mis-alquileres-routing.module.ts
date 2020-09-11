import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAlquileresPage } from './mis-alquileres.page';

const routes: Routes = [
  {
    path: '',
    component: MisAlquileresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAlquileresPageRoutingModule {}
