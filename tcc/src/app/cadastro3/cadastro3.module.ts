import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cadastro3PageRoutingModule } from './cadastro3-routing.module';

import { Cadastro3Page } from './cadastro3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cadastro3PageRoutingModule
  ],
  declarations: [Cadastro3Page]
})
export class Cadastro3PageModule {}
