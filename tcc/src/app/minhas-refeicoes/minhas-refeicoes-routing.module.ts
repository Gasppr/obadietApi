import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasRefeicoesPage } from './minhas-refeicoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasRefeicoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasRefeicoesPageRoutingModule {}
