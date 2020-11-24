import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisbicisPoraprobarPage } from './misbicis-poraprobar.page';

const routes: Routes = [
  {
    path: '',
    component: MisbicisPoraprobarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisbicisPoraprobarPageRoutingModule {}
