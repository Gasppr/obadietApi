import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Iniciov2Page } from './iniciov2.page';

const routes: Routes = [
  {
    path: '',
    component: Iniciov2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Iniciov2PageRoutingModule {}
