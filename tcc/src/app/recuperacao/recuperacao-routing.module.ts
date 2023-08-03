import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperacaoPage } from './recuperacao.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperacaoPageRoutingModule {}
