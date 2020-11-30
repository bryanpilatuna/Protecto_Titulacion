import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTiendaPageRoutingModule } from './edit-tienda-routing.module';

import { EditTiendaPage } from './edit-tienda.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTiendaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditTiendaPage]
})
export class EditTiendaPageModule {}
