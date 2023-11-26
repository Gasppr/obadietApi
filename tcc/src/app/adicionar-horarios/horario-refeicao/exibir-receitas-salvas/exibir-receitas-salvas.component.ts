import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
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

  receitasSalvas = [
    {
      idReceita: 1,
      nome: 'camarao',
      img: 'https://kipeixe.com.br/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/i/m/imagem_1_15_5.jpg'
    },
    {
      idReceita: 2,
      nome: 'camarao abacaxi',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/194/977/products/abacaxi-perola11-d39b14434678c43cc815897563419666-640-0.jpg'
    },
    {
      idReceita: 3,
      nome: 'camarao batata',
      img: 'https://scfoods.fbitsstatic.net/img/p/batata-lavada-500g-70629/257131.jpg?w=800&h=800&v=no-change&qs=ignore'
    },
    {
      idReceita: 4,
      nome: 'camarao cerveja',
      img: 'https://i.ytimg.com/vi/NEENrXgoqcM/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHmA4AC6AKKAgwIABABGHIgRygqMA8=&rs=AOn4CLAGybaQlMl_7KEACtSNLaPFFRSe9A'
    }
  ]

  constructor(private modalCtrl: ModalController, private recipesService: RecipesService) {
    this.receitaSelecionada = this.iniciarReceitaSelecionada();
  }

  ngOnInit() {
    this.receitas$ = this.recipesService.buscarReceitas();
    this.filteredReceitas$ = this.receitas$;
  }

  mudarSelecionarCategoria(e: any){
    this.selecionarCategoria = e.detail.value;
    console.log(this.selecionarCategoria)
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
