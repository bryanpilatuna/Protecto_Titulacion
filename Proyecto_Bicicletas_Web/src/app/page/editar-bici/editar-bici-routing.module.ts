import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarBiciPage } from './editar-bici.page';

const routes: Routes = [
  {
    path: '',
    component: EditarBiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarBiciPageRoutingModule {}
