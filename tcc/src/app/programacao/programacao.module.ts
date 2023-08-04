import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramacaoPageRoutingModule } from './programacao-routing.module';

import { ProgramacaoPage } from './programacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramacaoPageRoutingModule
  ],
  declarations: [ProgramacaoPage]
})
export class ProgramacaoPageModule {}
