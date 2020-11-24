import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaDonacionPage } from './tienda-donacion.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaDonacionPage,
    children: [
      {
        path:'donaaprobar',
        loadChildren:   () => import('../donaciones-aprobar/donaciones-aprobar.module').then( m => m.DonacionesAprobarPageModule)
      },
      {
        path:'donaaprobadas',
        loadChildren: () => import('../donaciones-aprobadas/donaciones-aprobadas.module').then( m => m.DonacionesAprobadasPageModule)
        
      },
      {
        path:'donarechazadas',
        loadChildren:  () => import('../donaciones-rechazadas/donaciones-rechazadas.module').then( m => m.DonacionesRechazadasPageModule)
        
      },
      {
        path: '',
        redirectTo: 'donaaprobar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaDonacionPageRoutingModule {}
