import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { StorageService } from '../services/Login/storage.service';
import { LoginService } from '../services/Login/login.service';


@Component({
  selector: 'app-receitas-salvas',
  templateUrl: './receitas-salvas.page.html',
  styleUrls: ['./receitas-salvas.page.scss'],
})
export class ReceitasSalvasPage implements OnInit {
  receitasSalvas: any = [];
  usuario?: any;
  receita: any = [];

  constructor(private recipesService: RecipesService, private storage: StorageService, private loginService: LoginService) {
    //this.carregarDados();
    //this.buscarReceitasSalvas();
    this.recipesService.receitasSalvas$.subscribe((receitasSalvas) => {
      this.receita = receitasSalvas;
      console.log(this.receita);
    });

  }

  ngOnInit() { }

  async buscarDetalhesReceitasSalvas(id: string){
    await this.recipesService.buscarDetalhesReceita(id).subscribe({
      next: (data: any) => {
        this.receitasSalvas.push(data);
        console.log(this.receitasSalvas);
      }
    })
  }

  async buscarReceitasSalvas() {
    let token = await this.storage.buscarToken('token');
    await this.recipesService.buscarReceitasSalvas(token).subscribe({
      next: (data: any) => {
        this.receita = data.receitasSalvas;
        console.log(this.receita);
        for (let i = 0; i < this.receita.length; i++){
          this.buscarDetalhesReceitasSalvas(this.receita[i].restricoes.receita_id)
        }
      }
    });
  }


  async desfavoritarReceita(receita: any) {
    this.recipesService.removerReceitaSalva(/*{ usuarios_id: this.usuario.id, receita_id: idReceita }*/receita);
    console.log('Receita desfavoritada!');
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
