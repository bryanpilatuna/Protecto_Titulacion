import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionesRechazadasPage } from './donaciones-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: DonacionesRechazadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonacionesRechazadasPageRoutingModule {}
