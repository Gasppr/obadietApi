import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cadastro3Page } from './cadastro3.page';

const routes: Routes = [
  {
    path: '',
    component: Cadastro3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cadastro3PageRoutingModule {}
