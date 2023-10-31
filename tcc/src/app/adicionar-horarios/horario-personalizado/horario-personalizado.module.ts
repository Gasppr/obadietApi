import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from './horario-personalizado.component';



@NgModule({
  declarations: [HorarioPersonalizadoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HorarioPersonalizadoComponent]
})
export class HorarioPersonalizadoModule { }
