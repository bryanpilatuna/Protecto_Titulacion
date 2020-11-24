import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisBicisPage } from './mis-bicis.page';

const routes: Routes = [
  {
    path: '',
    component: MisBicisPage,
    children: [
      {
        path:'disponibles',
        loadChildren:  () => import('../bicis-disponibles/bicis-disponibles.module').then( m => m.BicisDisponiblesPageModule)     
      },
      {
        path:'nodisponibles',
        loadChildren: () => import('../bicis-nodisponibles/bicis-nodisponibles.module').then( m => m.BicisNodisponiblesPageModule)
        
      },
      {
        path:'mantenimiento',
        loadChildren: () => import('../bicis-mantenimiento/bicis-mantenimiento.module').then( m => m.BicisMantenimientoPageModule)
        
      },
      {
        path: '',
        redirectTo: 'disponibles',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisBicisPageRoutingModule {}
