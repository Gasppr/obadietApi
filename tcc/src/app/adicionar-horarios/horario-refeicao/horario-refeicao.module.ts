import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioRefeicaoComponent } from './horario-refeicao.component';



@NgModule({
  declarations: [HorarioRefeicaoComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [HorarioRefeicaoComponent]
})
export class HorarioRefeicaoModule { }
