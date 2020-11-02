import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisBicisPage } from './mis-bicis.page';

const routes: Routes = [
  {
    path: '',
    component: MisBicisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisBicisPageRoutingModule {}
