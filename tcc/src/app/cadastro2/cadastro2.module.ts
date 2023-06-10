import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cadastro2PageRoutingModule } from './cadastro2-routing.module';

import { Cadastro2Page } from './cadastro2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cadastro2PageRoutingModule
  ],
  declarations: [Cadastro2Page]
})
export class Cadastro2PageModule {}
