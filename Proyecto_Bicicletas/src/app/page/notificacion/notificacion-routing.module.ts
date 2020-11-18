import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionPage } from './notificacion.page';



const routes: Routes = [
  {
    path: 'notificacion',
    component: NotificacionPage,
    children: [
      {
        path: 'notificacion-alquiler',
        loadChildren: () => import('../../page/notificacion-alquiler/notificacion-alquiler.module').then( m => m.NotificacionAlquilerPageModule)
      },
      {
        path: 'notificacion-donacion',
        loadChildren: () => import('../../page/notificacion-donacion/notificacion-donacion.module').then( m => m.NotificacionDonacionPageModule)
      },
      {
        path: '',
        redirectTo: 'notificacion/notificacion-alquiler',
        pathMatch: 'full'
      }
    ]
  },
  
  {
    path: '',
    redirectTo: 'notificacion/notificacion-alquiler',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionPageRoutingModule {}
