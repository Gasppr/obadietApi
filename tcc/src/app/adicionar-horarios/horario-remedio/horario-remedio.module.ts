import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioRemedioComponent } from './horario-remedio.component';
import { HorarioPersonalizadoModule } from '../horario-personalizado/horario-personalizado.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HorarioRemedioComponent],
  imports: [
    CommonModule,
    IonicModule,
    HorarioPersonalizadoModule,
    FormsModule
  ],
  exports: [HorarioRemedioComponent]
})
export class HorarioRemedioModule { }
