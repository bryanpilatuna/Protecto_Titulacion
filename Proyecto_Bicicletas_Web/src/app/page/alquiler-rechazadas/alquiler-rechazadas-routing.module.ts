import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquilerRechazadasPage } from './alquiler-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: AlquilerRechazadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquilerRechazadasPageRoutingModule {}
