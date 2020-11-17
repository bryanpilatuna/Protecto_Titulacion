import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionPage } from './notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionPage,
    children: [
      {
        path: 'donacion',
        loadChildren: () => import('../../page/donacion/donacion.module').then( m => m.DonacionPageModule)
      },
      {
        path: 'alquileres',
        loadChildren: () => import('../../page/alquileres/alquileres.module').then( m => m.AlquileresPageModule)
      },
      {
        path: '',
        redirectTo: 'notificacion/alquileres',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionPageRoutingModule {}
