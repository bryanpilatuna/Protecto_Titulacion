import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarBiciPageRoutingModule } from './editar-bici-routing.module';

import { EditarBiciPage } from './editar-bici.page';

import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBiciPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditarBiciPage]
})
export class EditarBiciPageModule {}
