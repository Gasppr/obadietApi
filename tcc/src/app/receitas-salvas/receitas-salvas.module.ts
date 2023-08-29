import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceitasSalvasPageRoutingModule } from './receitas-salvas-routing.module';

import { ReceitasSalvasPage } from './receitas-salvas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceitasSalvasPageRoutingModule
  ],
  declarations: [ReceitasSalvasPage]
})
export class ReceitasSalvasPageModule {}
