import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTiendaPageRoutingModule } from './editar-tienda-routing.module';

import { EditarTiendaPage } from './editar-tienda.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTiendaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarTiendaPage]
})
export class EditarTiendaPageModule {}
