import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cadastro1Page } from './cadastro1.page';

const routes: Routes = [
  {
    path: '',
    component: Cadastro1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cadastro1PageRoutingModule {}
