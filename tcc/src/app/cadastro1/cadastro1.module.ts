import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cadastro1PageRoutingModule } from './cadastro1-routing.module';

import { Cadastro1Page } from './cadastro1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cadastro1PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Cadastro1Page]
})
export class Cadastro1PageModule {}
