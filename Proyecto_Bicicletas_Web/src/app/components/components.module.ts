import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { HeaderAdministradorComponent } from './header-administrador/header-administrador.component';

@NgModule({
  declarations: [
    HeaderComponent,FooterComponent,HeaderAdministradorComponent
  ],
  exports:[
    HeaderComponent,FooterComponent,HeaderAdministradorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
