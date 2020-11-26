import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonarPageRoutingModule } from './donar-routing.module';

import { DonarPage } from './donar.page';
import { ComponentsModule } from '../../componentes/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DonarPage]
})
export class DonarPageModule {}
