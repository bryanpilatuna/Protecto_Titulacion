import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionAlquilerPage } from './notificacion-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionAlquilerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionAlquilerPageRoutingModule {}
