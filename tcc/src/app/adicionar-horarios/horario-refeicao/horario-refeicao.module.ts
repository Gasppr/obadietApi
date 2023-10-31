import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioRefeicaoComponent } from './horario-refeicao.component';
import { HorarioPersonalizadoModule } from '../horario-personalizado/horario-personalizado.module';



@NgModule({
  declarations: [HorarioRefeicaoComponent],
  imports: [
    CommonModule,
    IonicModule,
    HorarioPersonalizadoModule
  ],
  exports: [HorarioRefeicaoComponent]
})
export class HorarioRefeicaoModule { }
