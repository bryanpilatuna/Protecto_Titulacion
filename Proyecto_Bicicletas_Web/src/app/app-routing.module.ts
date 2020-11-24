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
    path: 'profile/:id',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'formulario-alquiler/:id',
    loadChildren: () => import('./page/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule)
  },
  {
    path: 'modal-alquiler',
    loadChildren: () => import('./modal/modal-alquiler/modal-alquiler.module').then( m => m.ModalAlquilerPageModule)
  },
  {
    path: 'formulario-donacion/:id',
    loadChildren: () => import('./page/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule)
  },
  {
    path: 'ubicar-tienda/:id',
    loadChildren: () => import('./page/ubicar-tienda/ubicar-tienda.module').then( m => m.UbicarTiendaPageModule)
  },
  {
    path: 'alquiler-donacion',
    loadChildren: () => import('./page/alquiler-donacion/alquiler-donacion.module').then( m => m.AlquilerDonacionPageModule)
  },
  {
    path: 'donacion',
    loadChildren: () => import('./page/donacion/donacion.module').then( m => m.DonacionPageModule)
  },
  {
    path: 'alquileres',
    loadChildren: () => import('./page/alquileres/alquileres.module').then( m => m.AlquileresPageModule)
  },
  {
    path: 'alquiler/:id',
    loadChildren: () => import('./page/alquiler/alquiler.module').then( m => m.AlquilerPageModule)
  },
  {
    path: 'donar/:id',
    loadChildren: () => import('./page/donar/donar.module').then( m => m.DonarPageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./page/notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'notificacion-alquiler',
    loadChildren: () => import('./page/notificacion-alquiler/notificacion-alquiler.module').then( m => m.NotificacionAlquilerPageModule)
  },
  {
    path: 'notificacion-donacion',
    loadChildren: () => import('./page/notificacion-donacion/notificacion-donacion.module').then( m => m.NotificacionDonacionPageModule)
  },
  {
    path: 'detallenotidonar/:id',
    loadChildren: () => import('./page/detallenotidonar/detallenotidonar.module').then( m => m.DetallenotidonarPageModule)
  },
  {
    path: 'detallenotificacion/:id',
    loadChildren: () => import('./page/detallenotificacion/detallenotificacion.module').then( m => m.DetallenotificacionPageModule)
  },
  {
    path: 'misbicis-poraprobar',
    loadChildren: () => import('./page/misbicis-poraprobar/misbicis-poraprobar.module').then( m => m.MisbicisPoraprobarPageModule)
  },
  {
    path: 'bicis-disponibles',
    loadChildren: () => import('./page/bicis-disponibles/bicis-disponibles.module').then( m => m.BicisDisponiblesPageModule)
  },  {
    path: 'bicis-nodisponibles',
    loadChildren: () => import('./page/bicis-nodisponibles/bicis-nodisponibles.module').then( m => m.BicisNodisponiblesPageModule)
  },
  {
    path: 'bicis-mantenimiento',
    loadChildren: () => import('./page/bicis-mantenimiento/bicis-mantenimiento.module').then( m => m.BicisMantenimientoPageModule)
  },
  {
    path: 'donaciones-aprobar',
    loadChildren: () => import('./page/donaciones-aprobar/donaciones-aprobar.module').then( m => m.DonacionesAprobarPageModule)
  },
  {
    path: 'donaciones-aprobadas',
    loadChildren: () => import('./page/donaciones-aprobadas/donaciones-aprobadas.module').then( m => m.DonacionesAprobadasPageModule)
  },
  {
    path: 'donaciones-rechazadas',
    loadChildren: () => import('./page/donaciones-rechazadas/donaciones-rechazadas.module').then( m => m.DonacionesRechazadasPageModule)
  },
  {
    path: 'alquiler-aprobar',
    loadChildren: () => import('./page/alquiler-aprobar/alquiler-aprobar.module').then( m => m.AlquilerAprobarPageModule)
  },
  {
    path: 'alquiler-aprobadas',
    loadChildren: () => import('./page/alquiler-aprobadas/alquiler-aprobadas.module').then( m => m.AlquilerAprobadasPageModule)
  },
  {
    path: 'alquiler-rechazadas',
    loadChildren: () => import('./page/alquiler-rechazadas/alquiler-rechazadas.module').then( m => m.AlquilerRechazadasPageModule)
  },


 












  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
