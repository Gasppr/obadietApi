import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { HorariosService } from 'src/app/services/horarios.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { StorageHorarioService } from 'src/app/services/storage-horario.service';

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

  constructor(private modalCtrl: ModalController, private recipesService: RecipesService, private horariosService: HorariosService, private storage: StorageHorarioService) {
    this.receitaSelecionada = this.iniciarReceitaSelecionada();
  }

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
    this.filteredReceitas$ = this.receitas$;
  }

  async carregarReceitasSalvas(){
    let token = await this.storage.buscarToken("token");
    this.recipesService.buscarReceitasSalvas(token).subscribe({
      next: async (data: any) => {
        this.receitasSalvas = data;
      }
    })
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
