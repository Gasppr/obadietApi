import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {

  receitas$!: Observable<any>;

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
  }

  verDetalhes(receitaId: number) {
    this.router.navigate(['obaDiet/receita'], { queryParams: { id: receitaId } });
  }
}
