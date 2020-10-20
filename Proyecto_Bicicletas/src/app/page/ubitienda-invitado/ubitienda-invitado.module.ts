import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbitiendaInvitadoPageRoutingModule } from './ubitienda-invitado-routing.module';

import { UbitiendaInvitadoPage } from './ubitienda-invitado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbitiendaInvitadoPageRoutingModule
  ],
  declarations: [UbitiendaInvitadoPage]
})
export class UbitiendaInvitadoPageModule {}
