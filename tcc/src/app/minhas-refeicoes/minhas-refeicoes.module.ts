import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
  declarations: [MinhasRefeicoesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinhasRefeicoesPageModule {}
