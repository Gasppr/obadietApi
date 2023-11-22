import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate:[AuthGuard]
        
      },
      {
        path: 'receitas-salvas',
        loadChildren: () => import('../receitas-salvas/receitas-salvas.module').then(m => m.ReceitasSalvasPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'programacao',
        loadChildren: () => import('../programacao/programacao.module').then( m => m.ProgramacaoPageModule),
        canActivate:[AuthGuard]

      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('../configuracoes/configuracoes.module').then(m => m.ConfiguracoesPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'receita',
        loadChildren: () => import('../receita/receita-routing.module').then(m => m.ReceitaPageRoutingModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'receitas',
        loadChildren: () => import('../receitas/receitas-routing.module').then(m => m.ReceitasPageRoutingModule),
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
