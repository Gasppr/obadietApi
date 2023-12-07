import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StorageService } from '../services/Login/storage.service';
import { LoginService } from '../services/Login/login.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  usuario?: any;
  receitas$!: Observable<any[]>;
  filteredReceitas$!: Observable<any[]>;
  searchTerm: string = '';

  constructor(private recipesService: RecipesService, private router: Router, private storage: StorageService, private loginService: LoginService) {
    this.carregarDados();
  }

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

  async favoritarReceita(receita: any) {
    this.recipesService.salvarReceita({ usuarios_id: this.usuario.id, receita_id: receita.id}/*receita*/);
    console.log('Receita favoritada!');
  }

  async desfavoritarReceita(receita: any){
    this.recipesService.removerReceitaSalva({usuarios_id : this.usuario.id , receita_id : receita.id}/*receita*/);
    console.log('Receita desfavoritada!');
  }

  toggleFavorito(receita: any) {
    receita.favorita = !receita.favorita;

    if (receita.favorita == true){
      this.favoritarReceita(receita);
    }
    else this.desfavoritarReceita(receita);
  }

  async carregarDados() {
    let token = await this.storage.buscarToken('token');

    await (
      await this.loginService.credenciaisUsuario(token)
    ).subscribe({
      next: (data: any) => {
        this.usuario = data;
      },
    });
  }
}
