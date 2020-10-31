import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTiendaPage } from './menu-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTiendaPageRoutingModule {}
