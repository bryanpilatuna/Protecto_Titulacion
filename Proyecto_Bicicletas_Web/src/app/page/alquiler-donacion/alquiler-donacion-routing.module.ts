import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquilerDonacionPage } from './alquiler-donacion.page';

const routes: Routes = [
  {
    path: 'alquiler-donacion',
    component: AlquilerDonacionPage,
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
        redirectTo: 'alquiler-donacion/alquileres',
        pathMatch: 'full'
      }
    ]
  },
  
  {
    path: '',
    redirectTo: 'alquiler-donacion/alquileres',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquilerDonacionPageRoutingModule {}
