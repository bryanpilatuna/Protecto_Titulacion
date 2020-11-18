import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage,
    children: [
      {
      path:'cliente',
      loadChildren:'../registro-cliente/registro-cliente.module#RegistroClientePageModule',
    },
    {
      path:'tienda',
      loadChildren:'../registro-tienda/registro-tienda.module#RegistroTiendaPageModule',
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
