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
    loadChildren: () => import('./page/formulario-donacion/formulario-donacion.module').then( m => m.FormularioDonacionPageModule)
  },
  {
    path: 'formulario-alquiler/:id',
    loadChildren: () => import('./page/formulario-alquiler/formulario-alquiler.module').then( m => m.FormularioAlquilerPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./page/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'mis-alquileres/:id',
    loadChildren: () => import('./page/mis-alquileres/mis-alquileres.module').then( m => m.MisAlquileresPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
