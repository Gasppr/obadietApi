import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasRefeicoesPageRoutingModule } from './minhas-refeicoes-routing.module';

import { MinhasRefeicoesPage } from './minhas-refeicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasRefeicoesPageRoutingModule
  ],
  declarations: [MinhasRefeicoesPage]
})
export class MinhasRefeicoesPageModule {}
