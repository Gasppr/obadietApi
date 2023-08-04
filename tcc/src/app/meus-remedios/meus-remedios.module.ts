import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusRemediosPageRoutingModule } from './meus-remedios-routing.module';

import { MeusRemediosPage } from './meus-remedios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusRemediosPageRoutingModule
  ],
  declarations: [MeusRemediosPage]
})
export class MeusRemediosPageModule {}
