import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'obaDiet',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'iniciov2',
    loadChildren: () => import('./iniciov2/iniciov2.module').then( m => m.Iniciov2PageModule)
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
  },
  {
    path: 'obaDiet/receita',
    loadChildren: () => import('./receita/receita.module').then( m => m.ReceitaPageModule)
  },
  {
    path: 'obaDiet/meus-remedios',
    loadChildren: () => import('./meus-remedios/meus-remedios.module').then( m => m.MeusRemediosPageModule)
  },
  {
    path: 'obaDiet/minhas-refeicoes',
    loadChildren: () => import('./minhas-refeicoes/minhas-refeicoes.module').then( m => m.MinhasRefeicoesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
