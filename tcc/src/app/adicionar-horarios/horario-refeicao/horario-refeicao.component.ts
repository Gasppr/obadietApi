import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';
import { ExibirReceitasSalvasComponent } from './exibir-receitas-salvas/exibir-receitas-salvas.component';

interface Receita{
  idReceita: number;
  nome: string;
  img: string;
}

interface HorarioRefeicao{
  data: string;
  refeicao: string;
  receitas: Receita[];
  //repetir: string;
  horario: string;
}

@Component({
  selector: 'app-horario-refeicao',
  templateUrl: './horario-refeicao.component.html',
  styleUrls: ['./horario-refeicao.component.scss'],
})
export class HorarioRefeicaoComponent  implements OnInit {
  horarioRefeicao: HorarioRefeicao
  receita: Receita

  constructor(private modalCtrl: ModalController) {
    this.horarioRefeicao = this.iniciarHorarioRefeicao();
    this.receita = this.iniciarReceita();
  }

  iniciarHorarioRefeicao(): HorarioRefeicao {
    return { data: '', refeicao: '', receitas: [], /*repetir: '',*/ horario: '' }
  }

  iniciarReceita(): Receita {
    return { idReceita: 0, nome: '', img: ''}
  }

  ngOnInit() {}

  index: number = 0;
  removeReceita(id: number){
    
    for(let i = 0; i < this.horarioRefeicao.receitas.length; i++){
      if(this.horarioRefeicao.receitas[i].idReceita === id){
        this.index = i;
      }
    }
    

    this.horarioRefeicao.receitas.splice(this.index, 1);
    console.log(`receita ${this.index} removida`);
  }

  selecionarRefeicao(e: any) {
    this.horarioRefeicao.refeicao = e.detail.value;
    console.log(this.horarioRefeicao.refeicao);
  }

  selecionarData(e: any) {
    this.horarioRefeicao.data = e.detail.value;
    console.log(this.horarioRefeicao.data);
  }

  selecionarHorario(e: any) {
    this.horarioRefeicao.horario = e.detail.value;
    console.log(this.horarioRefeicao.horario);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  async openModalHrPers() {
    const modal = await this.modalCtrl.create({
      component: HorarioPersonalizadoComponent,
    });
    modal.present();

    /*const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }*/
  }


  async openModalReceitasSalvas() {
    const modal = await this.modalCtrl.create({
      component: ExibirReceitasSalvasComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      /*this.receita.idReceita = data.idRecSelec;
      this.receita.nome = data.nomeRecSelec;
      this.receita.img = data.imgRecSelec;*/
      this.horarioRefeicao.receitas.push({idReceita: data.idRecSelec, nome: data.nomeRecSelec, img: data.imgRecSelec});
      console.log(`receita ${data.nomeRecSelec} adicionada`)
    }
  }
}
