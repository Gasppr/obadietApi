import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceitasSalvasPage } from './receitas-salvas.page';

const routes: Routes = [
  {
    path: '',
    component: ReceitasSalvasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceitasSalvasPageRoutingModule {}
