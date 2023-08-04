import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusRemediosPage } from './meus-remedios.page';

const routes: Routes = [
  {
    path: '',
    component: MeusRemediosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusRemediosPageRoutingModule {}
