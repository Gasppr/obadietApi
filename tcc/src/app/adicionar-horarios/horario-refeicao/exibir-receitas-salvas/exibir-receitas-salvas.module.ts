import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExibirReceitasSalvasComponent } from './exibir-receitas-salvas.component';



@NgModule({
  declarations: [ExibirReceitasSalvasComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ExibirReceitasSalvasComponent
  ]
})
export class ExibirReceitasSalvasModule { }
