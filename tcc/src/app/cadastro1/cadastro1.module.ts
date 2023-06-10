import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cadastro1PageRoutingModule } from './cadastro1-routing.module';

import { Cadastro1Page } from './cadastro1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cadastro1PageRoutingModule
  ],
  declarations: [Cadastro1Page]
})
export class Cadastro1PageModule {}
