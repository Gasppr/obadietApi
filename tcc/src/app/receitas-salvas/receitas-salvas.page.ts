import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-receitas-salvas',
  templateUrl: './receitas-salvas.page.html',
  styleUrls: ['./receitas-salvas.page.scss'],
})
export class ReceitasSalvasPage implements OnInit {
  comidas: any[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.receitasSalvas$.subscribe((receitasSalvas) => {
      this.comidas = receitasSalvas;
    });
    
  }
  removerReceitaSalva(receita: any) {
    this.recipesService.removerReceitaSalva(receita);
  }
}
