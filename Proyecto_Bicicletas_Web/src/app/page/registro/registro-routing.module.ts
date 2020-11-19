import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage,
    children: [
    {
      path:'tienda',
      loadChildren: () => import('../registro-tienda/registro-tienda.module').then( m => m.RegistroTiendaPageModule)      
    },
    {
      path:'cliente',
      loadChildren: () => import('../registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
      
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
