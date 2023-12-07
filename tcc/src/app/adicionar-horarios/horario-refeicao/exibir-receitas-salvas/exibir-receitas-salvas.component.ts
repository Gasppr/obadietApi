import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { StorageService } from 'src/app/services/Login/storage.service';
import { RecipesService } from 'src/app/services/recipes.service';

interface ReceitaSelecionada{
  idRecSelec: number;
  nomeRecSelec: string;
  imgRecSelec: string;
}

@Component({
  selector: 'app-exibir-receitas-salvas',
  templateUrl: './exibir-receitas-salvas.component.html',
  styleUrls: ['./exibir-receitas-salvas.component.scss'],
})

export class ExibirReceitasSalvasComponent  implements OnInit {
  receitaSelecionada: ReceitaSelecionada;

  receitas$!: Observable<any[]>;
  filteredReceitas$!: Observable<any[]>;
  searchTerm: string = '';

  selecionarCategoria: string = 'salvas'

  iniciarReceitaSelecionada(): ReceitaSelecionada {
    return { idRecSelec: 0, nomeRecSelec: '', imgRecSelec: ''}
  }

  receitasSalvas: any;

  constructor(private modalCtrl: ModalController, private recipesService: RecipesService, private storage: StorageService) {
    this.receitaSelecionada = this.iniciarReceitaSelecionada();
    this.buscarReceitasSalvas();
  }

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
    this.filteredReceitas$ = this.receitas$;
  }

  mudarSelecionarCategoria(e: any){
    this.selecionarCategoria = e.detail.value;
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

  async buscarReceitasSalvas() {
    let token = await this.storage.buscarToken("token");
    await this.recipesService.buscarReceitasSalvas(token).subscribe({
      next: (data: any) => {
        this.receitasSalvas = data.receitasSalvas;
        console.log(this.receitasSalvas)
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.receitaSelecionada, 'confirm');
  }

  selecionarReceita(id: number, nome: string, img: string){
    this.receitaSelecionada.idRecSelec = id;
    this.receitaSelecionada.nomeRecSelec = nome;
    this.receitaSelecionada.imgRecSelec = img;
  }
}
