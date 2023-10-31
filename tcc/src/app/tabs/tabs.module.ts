import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HorarioRefeicaoModule } from '../adicionar-horarios/horario-refeicao/horario-refeicao.module';
import { HorarioRemedioModule } from '../adicionar-horarios/horario-remedio/horario-remedio.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HorarioRefeicaoModule,
    HorarioRemedioModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
