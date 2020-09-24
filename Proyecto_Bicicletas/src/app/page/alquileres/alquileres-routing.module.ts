import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquileresPage } from './alquileres.page';

const routes: Routes = [
  {
    path: '',
    component: AlquileresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquileresPageRoutingModule {}
