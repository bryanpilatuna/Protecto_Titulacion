import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from './guard/administrador.guard';
import { AuthGuard } from './guard/auth.guard';
import { TiendaGuard } from './guard/tienda.guard';
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
    path: 'registro-tienda',
    loadChildren: () => import('./page/registro-tienda/registro-tienda.module').then( m => m.RegistroTiendaPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./page/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./page/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'menu-administrador',
    loadChildren: () => import('./page/menu-administrador/menu-administrador.module').then( m => m.MenuAdministradorPageModule)
  },
  {
    path: 'tienda-administrador',
    loadChildren: () => import('./page/tienda-administrador/tienda-administrador.module').then( m => m.TiendaAdministradorPageModule),
    canActivate: [AdministradorGuard]

    
  },
  {
    path: 'cliente-administrador',
    loadChildren: () => import('./page/cliente-administrador/cliente-administrador.module').then( m => m.ClienteAdministradorPageModule),
    canActivate: [AdministradorGuard]
  },
  {
    path: 'perfil-administrador',
    loadChildren: () => import('./page/perfil-administrador/perfil-administrador.module').then( m => m.PerfilAdministradorPageModule),
    canActivate: [AdministradorGuard]
 
  },
  {
    path: 'editar-tienda',
    loadChildren: () => import('./page/editar-tienda/editar-tienda.module').then( m => m.EditarTiendaPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'menu-tienda',
    loadChildren: () => import('./page/menu-tienda/menu-tienda.module').then( m => m.MenuTiendaPageModule),
    canActivate: [TiendaGuard]

  },
  {
    path: 'registro-bici',
    loadChildren: () => import('./page/registro-bici/registro-bici.module').then( m => m.RegistroBiciPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'mis-bicis',
    loadChildren: () => import('./page/mis-bicis/mis-bicis.module').then( m => m.MisBicisPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'edit-tienda/:id',
    loadChildren: () => import('./page/edit-tienda/edit-tienda.module').then( m => m.EditTiendaPageModule),
    canActivate: [TiendaGuard]
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
    path: 'tienda-donacion',
    loadChildren: () => import('./page/tienda-donacion/tienda-donacion.module').then( m => m.TiendaDonacionPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'tienda-alquiler',
    loadChildren: () => import('./page/tienda-alquiler/tienda-alquiler.module').then( m => m.TiendaAlquilerPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./page/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'notificaciones-tienda',
    loadChildren: () => import('./page/notificaciones-tienda/notificaciones-tienda.module').then( m => m.NotificacionesTiendaPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'formulario-alquiler',
    loadChildren: () => import('./page/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modal-alquiler',
    loadChildren: () => import('./modal/modal-alquiler/modal-alquiler.module').then( m => m.ModalAlquilerPageModule)
  },
  {
    path: 'formulario-donacion',
    loadChildren: () => import('./page/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicar-tienda/:id',
    loadChildren: () => import('./page/ubicar-tienda/ubicar-tienda.module').then( m => m.UbicarTiendaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquiler-donacion',
    loadChildren: () => import('./page/alquiler-donacion/alquiler-donacion.module').then( m => m.AlquilerDonacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'donacion',
    loadChildren: () => import('./page/donacion/donacion.module').then( m => m.DonacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquileres',
    loadChildren: () => import('./page/alquileres/alquileres.module').then( m => m.AlquileresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquiler/:id',
    loadChildren: () => import('./page/alquiler/alquiler.module').then( m => m.AlquilerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'donar/:id',
    loadChildren: () => import('./page/donar/donar.module').then( m => m.DonarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./page/notificacion/notificacion.module').then( m => m.NotificacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificacion-alquiler',
    loadChildren: () => import('./page/notificacion-alquiler/notificacion-alquiler.module').then( m => m.NotificacionAlquilerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificacion-donacion',
    loadChildren: () => import('./page/notificacion-donacion/notificacion-donacion.module').then( m => m.NotificacionDonacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detallenotidonar/:id',
    loadChildren: () => import('./page/detallenotidonar/detallenotidonar.module').then( m => m.DetallenotidonarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detallenotificacion/:id',
    loadChildren: () => import('./page/detallenotificacion/detallenotificacion.module').then( m => m.DetallenotificacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'misbicis-poraprobar',
    loadChildren: () => import('./page/misbicis-poraprobar/misbicis-poraprobar.module').then( m => m.MisbicisPoraprobarPageModule),
    canActivate: [TiendaGuard]

  },
  {
    path: 'bicis-disponibles',
    loadChildren: () => import('./page/bicis-disponibles/bicis-disponibles.module').then( m => m.BicisDisponiblesPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'bicis-nodisponibles',
    loadChildren: () => import('./page/bicis-nodisponibles/bicis-nodisponibles.module').then( m => m.BicisNodisponiblesPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'bicis-mantenimiento',
    loadChildren: () => import('./page/bicis-mantenimiento/bicis-mantenimiento.module').then( m => m.BicisMantenimientoPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'donaciones-aprobar',
    loadChildren: () => import('./page/donaciones-aprobar/donaciones-aprobar.module').then( m => m.DonacionesAprobarPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'donaciones-aprobadas',
    loadChildren: () => import('./page/donaciones-aprobadas/donaciones-aprobadas.module').then( m => m.DonacionesAprobadasPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'donaciones-rechazadas',
    loadChildren: () => import('./page/donaciones-rechazadas/donaciones-rechazadas.module').then( m => m.DonacionesRechazadasPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'alquiler-aprobar',
    loadChildren: () => import('./page/alquiler-aprobar/alquiler-aprobar.module').then( m => m.AlquilerAprobarPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'alquiler-aprobadas',
    loadChildren: () => import('./page/alquiler-aprobadas/alquiler-aprobadas.module').then( m => m.AlquilerAprobadasPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'alquiler-rechazadas',
    loadChildren: () => import('./page/alquiler-rechazadas/alquiler-rechazadas.module').then( m => m.AlquilerRechazadasPageModule),
    canActivate: [TiendaGuard]
  },
  {
    path: 'pruebas',
    loadChildren: () => import('./page/pruebas/pruebas.module').then( m => m.PruebasPageModule)
  },



 












  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
