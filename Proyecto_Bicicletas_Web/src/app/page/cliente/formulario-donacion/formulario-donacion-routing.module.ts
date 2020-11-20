import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioDonacionPage } from './formulario-donacion.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioDonacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioDonacionPageRoutingModule {}
