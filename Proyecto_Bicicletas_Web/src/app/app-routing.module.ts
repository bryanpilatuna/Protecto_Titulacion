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
  },  {
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
