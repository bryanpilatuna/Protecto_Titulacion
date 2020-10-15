import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAlquilerPage } from './modal-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAlquilerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAlquilerPageRoutingModule {}
