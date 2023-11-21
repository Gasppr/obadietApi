import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from './horario-personalizado.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HorarioPersonalizadoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [HorarioPersonalizadoComponent]
})
export class HorarioPersonalizadoModule { }
