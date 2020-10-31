import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { HeaderAdministradorComponent } from './header-administrador/header-administrador.component';
import { HeaderTiendaComponent } from './header-tienda/header-tienda.component';
@NgModule({
  declarations: [
    HeaderComponent,FooterComponent,HeaderAdministradorComponent,HeaderTiendaComponent
  ],
  exports:[
    HeaderComponent,FooterComponent,HeaderAdministradorComponent,HeaderTiendaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
