import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescagarAppPage } from './descagar-app.page';

const routes: Routes = [
  {
    path: '',
    component: DescagarAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescagarAppPageRoutingModule {}
