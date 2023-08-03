import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperacao',
    loadChildren: () => import('./recuperacao/recuperacao.module').then( m => m.RecuperacaoPageModule)
  },
  {
    path: 'cadastro1',
    loadChildren: () => import('./cadastro1/cadastro1.module').then( m => m.Cadastro1PageModule)
  },
  {
    path: 'cadastro2',
    loadChildren: () => import('./cadastro2/cadastro2.module').then( m => m.Cadastro2PageModule)
  },
  {
    path: 'cadastro3',
    loadChildren: () => import('./cadastro3/cadastro3.module').then( m => m.Cadastro3PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
