import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroBiciPageRoutingModule } from './registro-bici-routing.module';

import { RegistroBiciPage } from './registro-bici.page';

import { ComponentsModule } from '../../components/components.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroBiciPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroBiciPage]
})
export class RegistroBiciPageModule {}
