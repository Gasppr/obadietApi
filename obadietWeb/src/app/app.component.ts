import { Component } from '@angular/core';
import { ReceitasService } from './services/receitas.service';
import { ReceitaModel } from './services/receita.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'obadietWeb';

  receita?: ReceitaModel


  constructor(private receitasService: ReceitasService,) {

  }

  criarReceitas(receita: ReceitaModel) {
    return this.receitasService.criarReceita(receita)
  }

}
