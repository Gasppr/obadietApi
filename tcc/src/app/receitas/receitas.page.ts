import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {

  receitas$!: Observable<any>;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
  }

}
