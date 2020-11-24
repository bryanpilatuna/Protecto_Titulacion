import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaAlquilerPage } from './tienda-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaAlquilerPage,
    children: [
      {
        path:'alquiaprobar',
        loadChildren:   () => import('../alquiler-aprobar/alquiler-aprobar.module').then( m => m.AlquilerAprobarPageModule)
      },
      {
        path:'alquiaprobadas',
        loadChildren: () => import('../alquiler-aprobadas/alquiler-aprobadas.module').then( m => m.AlquilerAprobadasPageModule)
        
      },
      {
        path:'alquirechazadas',
        loadChildren: () => import('../alquiler-rechazadas/alquiler-rechazadas.module').then( m => m.AlquilerRechazadasPageModule)
        
      },
      {
        path: '',
        redirectTo: 'alquiaprobar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaAlquilerPageRoutingModule {}
