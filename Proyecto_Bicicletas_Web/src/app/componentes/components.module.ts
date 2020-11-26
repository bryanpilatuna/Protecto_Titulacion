import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    NotificacionComponent,
    MenuComponent,
    FooterComponent
  ],
  exports:[
    NotificacionComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
