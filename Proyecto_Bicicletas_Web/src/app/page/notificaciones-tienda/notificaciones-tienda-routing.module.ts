import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesTiendaPage } from './notificaciones-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesTiendaPageRoutingModule {}
