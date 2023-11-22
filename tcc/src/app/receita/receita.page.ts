import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage implements OnInit {

  receita: any;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {
    this.route.queryParams.subscribe(params => {
      const receitaId = params['id'];

      if (receitaId) {
        this.recipesService.buscarDetalhesReceita(receitaId).subscribe(
          (data) => {
            this.receita = data;
            console.log(this.receita);
          },
          (error) => {
            console.error('Erro ao buscar detalhes da receita:', error);
          }
        );
      }
    });
  }

  ngOnInit() {

  }
}