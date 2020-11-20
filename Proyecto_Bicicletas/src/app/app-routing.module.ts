import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./page/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'formulario-donacion/:id',
    loadChildren: () => import('./page/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'formulario-donacion',
    loadChildren: () => import('./page/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'formulario-alquiler/:id',
    loadChildren: () => import('./page/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'formulario-alquiler',
    loadChildren: () => import('./page/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./page/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'alquiler/:id',
    loadChildren: () => import('./page/alquiler/alquiler.module').then( m => m.AlquilerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquiler',
    loadChildren: () => import('./page/alquiler/alquiler.module').then( m => m.AlquilerPageModule),
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
    path: 'alquileres/:id',
    loadChildren: () => import('./page/alquileres/alquileres.module').then( m => m.AlquileresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alquiler-donacion/:id',
    loadChildren: () => import('./page/alquiler-donacion/alquiler-donacion.module').then( m => m.AlquilerDonacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'donar',
    loadChildren: () => import('./page/donar/donar.module').then( m => m.DonarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'donar/:id',
    loadChildren: () => import('./page/donar/donar.module').then( m => m.DonarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicar-tienda/:id',
    loadChildren: () => import('./page/ubicar-tienda/ubicar-tienda.module').then( m => m.UbicarTiendaPageModule)
  },
  {
    path: 'menu-invitado',
    loadChildren: () => import('./page/menu-invitado/menu-invitado.module').then( m => m.MenuInvitadoPageModule)
  },
  {
    path: 'modal-alquiler',
    loadChildren: () => import('./modal/modal-alquiler/modal-alquiler.module').then( m => m.ModalAlquilerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubitienda-invitado',
    loadChildren: () => import('./page/ubitienda-invitado/ubitienda-invitado.module').then( m => m.UbitiendaInvitadoPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./page/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'notificaciones/:id',
    loadChildren: () => import('./page/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'detallenotificacion',
    loadChildren: () => import('./page/detallenotificacion/detallenotificacion.module').then( m => m.DetallenotificacionPageModule)
  },
  {
    path: 'detallenotificacion/:id',
    loadChildren: () => import('./page/detallenotificacion/detallenotificacion.module').then( m => m.DetallenotificacionPageModule)
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















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
