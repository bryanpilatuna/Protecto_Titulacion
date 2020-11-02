import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroBiciPage } from './registro-bici.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroBiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroBiciPageRoutingModule {}
