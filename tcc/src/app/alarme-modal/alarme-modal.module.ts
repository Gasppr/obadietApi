import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmeModalComponent } from './alarme-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AlarmeModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AlarmeModalComponent]
})
export class AlarmeModalModule { }
