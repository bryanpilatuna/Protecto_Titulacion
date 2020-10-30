import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTiendaPage } from './editar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTiendaPageRoutingModule {}
