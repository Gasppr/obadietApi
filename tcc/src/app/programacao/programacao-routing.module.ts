import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramacaoPage } from './programacao.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramacaoPageRoutingModule {}
