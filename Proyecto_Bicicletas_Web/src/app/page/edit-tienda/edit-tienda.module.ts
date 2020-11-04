import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTiendaPageRoutingModule } from './edit-tienda-routing.module';

import { EditTiendaPage } from './edit-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTiendaPageRoutingModule
  ],
  declarations: [EditTiendaPage]
})
export class EditTiendaPageModule {}
