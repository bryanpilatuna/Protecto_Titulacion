import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'preguntas-frecuentes',
    loadChildren: () => import('./page/preguntas-frecuentes/preguntas-frecuentes.module').then( m => m.PreguntasFrecuentesPageModule)
  },
  {
    path: 'registro-tienda',
    loadChildren: () => import('./page/registro-tienda/registro-tienda.module').then( m => m.RegistroTiendaPageModule)
  },
  {
    path: 'descagar-app',
    loadChildren: () => import('./page/descagar-app/descagar-app.module').then( m => m.DescagarAppPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./page/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./page/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'menu-cliente',
    loadChildren: () => import('./page/menu-cliente/menu-cliente.module').then( m => m.MenuClientePageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./page/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'registro-administrador',
    loadChildren: () => import('./page/registro-administrador/registro-administrador.module').then( m => m.RegistroAdministradorPageModule)
  },
  {
    path: 'menu-administrador',
    loadChildren: () => import('./page/menu-administrador/menu-administrador.module').then( m => m.MenuAdministradorPageModule)
  },
  {
    path: 'tienda-administrador',
    loadChildren: () => import('./page/tienda-administrador/tienda-administrador.module').then( m => m.TiendaAdministradorPageModule)
  },
  {
    path: 'cliente-administrador',
    loadChildren: () => import('./page/cliente-administrador/cliente-administrador.module').then( m => m.ClienteAdministradorPageModule)
  },
  {
    path: 'perfil-administrador',
    loadChildren: () => import('./page/perfil-administrador/perfil-administrador.module').then( m => m.PerfilAdministradorPageModule)
  },
  {
    path: 'editar-tienda/:id',
    loadChildren: () => import('./page/editar-tienda/editar-tienda.module').then( m => m.EditarTiendaPageModule)
  },
  {
    path: 'menu-tienda',
    loadChildren: () => import('./page/menu-tienda/menu-tienda.module').then( m => m.MenuTiendaPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./page/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'registro-bici',
    loadChildren: () => import('./page/registro-bici/registro-bici.module').then( m => m.RegistroBiciPageModule)
  },
  {
    path: 'mis-bicis',
    loadChildren: () => import('./page/mis-bicis/mis-bicis.module').then( m => m.MisBicisPageModule)
  },
  {
    path: 'edit-tienda/:id',
    loadChildren: () => import('./page/edit-tienda/edit-tienda.module').then( m => m.EditTiendaPageModule)
  },
  {
    path: 'editar-bici/:id',
    loadChildren: () => import('./page/editar-bici/editar-bici.module').then( m => m.EditarBiciPageModule)
  },
  {
    path: 'edit-cliente/:id',
    loadChildren: () => import('./page/edit-cliente/edit-cliente.module').then( m => m.EditClientePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'tienda-donacion/:id',
    loadChildren: () => import('./page/tienda-donacion/tienda-donacion.module').then( m => m.TiendaDonacionPageModule)
  },
  {
    path: 'tienda-alquiler/:id',
    loadChildren: () => import('./page/tienda-alquiler/tienda-alquiler.module').then( m => m.TiendaAlquilerPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./page/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'notificaciones-tienda',
    loadChildren: () => import('./page/notificaciones-tienda/notificaciones-tienda.module').then( m => m.NotificacionesTiendaPageModule)
  },
  {
    path: 'modal-alquiler',
    loadChildren: () => import('./modal/modal-alquiler/modal-alquiler.module').then( m => m.ModalAlquilerPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./page/cliente/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'formulario-alquiler/:id',
    loadChildren: () => import('./page/cliente/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule)
  },
  {
    path: 'formulario-donacion/:id',
    loadChildren: () => import('./page/cliente/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule)
  },
  {
    path: 'ubicar-tienda/:id',
    loadChildren: () => import('./page/cliente/ubicar-tienda/ubicar-tienda.module').then( m => m.UbicarTiendaPageModule)
  },




  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
