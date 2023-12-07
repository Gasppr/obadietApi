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
  receitas: any = [];

  constructor(private recipesService: RecipesService, private storage: StorageService, private loginService: LoginService) {
    this.carregarDados();
    this.buscarReceitasSalvas();
    this.recipesService.receitasSalvas$.subscribe((receitasSalvas) => {
      this.receitas = receitasSalvas;
      console.log(this.receitas);
    });

  }

  ngOnInit() { }

  /*async buscarDetalhesReceitasSalvas(id: string){
    await this.recipesService.buscarDetalhesReceita(id).subscribe({
      next: (data: any) => {
        this.receitasSalvas.push(data);
        console.log(this.receitasSalvas);
      }
    })
  }*/

  async buscarReceitasSalvas() {
    let token = await this.storage.buscarToken('token');
    await this.recipesService.buscarReceitasSalvas(token).subscribe({
      next: (data: any) => {
        this.receitas = data.receitasSalvas;
        console.log(this.receitas);
        /*for (let i = 0; i < this.receitas.length; i++){
          this.buscarDetalhesReceitasSalvas(this.receitas[i].restricoes.receita_id)
        }*/
      }
    });
  }


  async desfavoritarReceita(receita: any) {
    this.recipesService.removerReceitaSalva({ usuarios_id: this.usuario.id, receita_id: receita.id }/*receita*/);
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
