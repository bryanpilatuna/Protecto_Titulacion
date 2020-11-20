import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from './notificacion/notificacion.component';

@NgModule({
  declarations: [
    NotificacionComponent
  ],
  exports:[
    NotificacionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
