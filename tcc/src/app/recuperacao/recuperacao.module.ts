import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperacaoPageRoutingModule } from './recuperacao-routing.module';

import { RecuperacaoPage } from './recuperacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacaoPageRoutingModule
  ],
  declarations: [RecuperacaoPage]
})
export class RecuperacaoPageModule {}
