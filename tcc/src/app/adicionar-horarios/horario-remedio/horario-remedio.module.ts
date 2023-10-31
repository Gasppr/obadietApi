import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioRemedioComponent } from './horario-remedio.component';
import { HorarioPersonalizadoModule } from '../horario-personalizado/horario-personalizado.module';



@NgModule({
  declarations: [HorarioRemedioComponent],
  imports: [
    CommonModule,
    IonicModule,
    HorarioPersonalizadoModule
  ],
  exports: [HorarioRemedioComponent]
})
export class HorarioRemedioModule { }
