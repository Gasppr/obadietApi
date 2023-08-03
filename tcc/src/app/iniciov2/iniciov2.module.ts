import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Iniciov2PageRoutingModule } from './iniciov2-routing.module';

import { Iniciov2Page } from './iniciov2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Iniciov2PageRoutingModule
  ],
  declarations: [Iniciov2Page]
})
export class Iniciov2PageModule {}
