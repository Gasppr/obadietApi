import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramacaoPageRoutingModule } from './programacao-routing.module';

import { ProgramacaoPage } from './programacao.page';
import { AlarmeModalModule } from '../alarme-modal/alarme-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramacaoPageRoutingModule,
    AlarmeModalModule
  ],
  declarations: [ProgramacaoPage]
})
export class ProgramacaoPageModule {}
