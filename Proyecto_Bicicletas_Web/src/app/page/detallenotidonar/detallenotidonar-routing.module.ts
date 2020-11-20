import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallenotidonarPage } from './detallenotidonar.page';

const routes: Routes = [
  {
    path: '',
    component: DetallenotidonarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallenotidonarPageRoutingModule {}
