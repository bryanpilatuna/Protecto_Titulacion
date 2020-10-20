import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbitiendaInvitadoPage } from './ubitienda-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: UbitiendaInvitadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbitiendaInvitadoPageRoutingModule {}
