import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAdministradorPage } from './menu-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdministradorPageRoutingModule {}
