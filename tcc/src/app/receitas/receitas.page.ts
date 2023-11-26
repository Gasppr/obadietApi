import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  receitas$!: Observable<any[]>;
  filteredReceitas$!: Observable<any[]>;
  searchTerm: string = '';

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
    this.filteredReceitas$ = this.receitas$;
  
    this.receitas$.subscribe((receitas) => {
      receitas.forEach((receita) => {
        receita.favorita = this.recipesService.isReceitaSalva(receita);
      });
    });
  }


  verDetalhes(receitaId: number) {
    this.router.navigate(['obaDiet/receita'], { queryParams: { id: receitaId } });
  }

  onSearchChange(event: any) {
    const searchTerm = event.detail.value.toLowerCase();

    if (searchTerm.trim() !== '') {
      this.filteredReceitas$ = this.receitas$.pipe(
        map((receitas: any[]) =>
          receitas.filter((receita: any) =>
            receita.nome.toLowerCase().includes(searchTerm)
          )
        )
      );
    } else {
      this.filteredReceitas$ = this.receitas$;
    }
  }

  salvarReceita(receita: any) {
    this.recipesService.salvarReceita(receita);
  }
  toggleFavorito(receita: any) {
    receita.favorita = !receita.favorita;
  }
}
