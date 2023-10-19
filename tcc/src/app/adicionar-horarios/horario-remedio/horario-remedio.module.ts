import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HorarioRemedioComponent } from './horario-remedio.component';



@NgModule({
  declarations: [HorarioRemedioComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [HorarioRemedioComponent]
})
export class HorarioRemedioModule { }
