import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAlquilerPage } from './formulario-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioAlquilerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioAlquilerPageRoutingModule {}
