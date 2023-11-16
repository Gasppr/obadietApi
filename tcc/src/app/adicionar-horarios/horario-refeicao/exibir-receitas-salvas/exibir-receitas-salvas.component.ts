import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalCtrl: ModalController) {
    this.receitaSelecionada = this.iniciarReceitaSelecionada();
  }



  ngOnInit() {}

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
