import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cadastro2Page } from './cadastro2.page';

const routes: Routes = [
  {
    path: '',
    component: Cadastro2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cadastro2PageRoutingModule {}
