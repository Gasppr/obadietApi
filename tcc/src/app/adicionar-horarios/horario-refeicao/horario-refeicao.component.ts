import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';
import { ExibirReceitasSalvasComponent } from './exibir-receitas-salvas/exibir-receitas-salvas.component';

interface Receita{
  idReceita: number;
  nome: string;
  img: string;
}

interface HorarioRefeicaoPersonalizado{
  horarioRefeicao: HorarioRefeicao;
  horarioPersonalizado: HorarioPersonalizado;
}

interface HorarioRefeicao{
  data: string;
  tipo: string;
  receitas: Receita[];
  repetir: string;
  horario: string;
}

interface HorarioPersonalizado {
  qtdRepeteCada: number;
  quandoRepeteCada: string;
  diasSemanaRepeticao: string[];
  qndTermina: string;
  qndTerminaData: string;
  qndTerminaHorario: string;
  nmrRepeticoesTermino: number;
}

@Component({
  selector: 'app-horario-refeicao',
  templateUrl: './horario-refeicao.component.html',
  styleUrls: ['./horario-refeicao.component.scss'],
})
export class HorarioRefeicaoComponent  implements OnInit {
  horarioRefeicao: HorarioRefeicao
  receita: Receita;
  horarioPersonalizado: HorarioPersonalizado;
  horarioRefeicaoPersonalizado: HorarioRefeicaoPersonalizado;

  constructor(private modalCtrl: ModalController) {
    this.horarioRefeicao = this.iniciarHorarioRefeicao();
    this.receita = this.iniciarReceita();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
    this.horarioRefeicaoPersonalizado = this.iniciarHorarioRefeicaoPersonalizado();
  }

  iniciarHorarioRefeicaoPersonalizado(): HorarioRefeicaoPersonalizado {
    return { horarioRefeicao: {data: '', tipo: '', receitas: [], repetir: '', horario: ''}, horarioPersonalizado: {qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0}}
  }
  iniciarHorarioRefeicao(): HorarioRefeicao {
    return { data: '', tipo: '', receitas: [], repetir: '', horario: '' }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
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
    this.horarioRefeicao.tipo = e.detail.value;
    console.log(this.horarioRefeicao.tipo);
  }

  selecionarData(e: any) {
    let datetime = e.detail.value;
    this.horarioRefeicao.data = datetime.split('T')[0];
    console.log(this.horarioRefeicao.data);
  }

  selecionarHorario(e: any) {
    let datetime = e.detail.value;
    this.horarioRefeicao.horario = datetime.split('T')[1];
    console.log(this.horarioRefeicao.horario);
  }

  selecionarRepeticao(e: string) {
    this.horarioRefeicao.repetir = e;
    console.log(this.horarioRefeicao.repetir);
    if (e !== 'Personalizado'){
      this.modalCtrl.dismiss();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.horarioRefeicao.tipo !== '' && this.horarioRefeicao.horario !== ''){
      this.horarioRefeicaoPersonalizado.horarioRefeicao = this.horarioRefeicao;

      if(this.horarioRefeicao.repetir === 'Personalizado'){
        this.horarioRefeicaoPersonalizado.horarioPersonalizado = this.horarioPersonalizado;
        console.log(this.horarioRefeicaoPersonalizado);
        return this.modalCtrl.dismiss('confirm');
      }
      else return this.modalCtrl.dismiss('confirm');
    }
    else return this.setOpen(true);
  }

  async openModalHrPers() {
    const modal = await this.modalCtrl.create({
      component: HorarioPersonalizadoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.horarioPersonalizado = data;
      console.log(this.horarioPersonalizado);
    }
  }


  async openModalReceitasSalvas() {
    const modal = await this.modalCtrl.create({
      component: ExibirReceitasSalvasComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.horarioRefeicao.receitas.push({idReceita: data.idRecSelec, nome: data.nomeRecSelec, img: data.imgRecSelec});
      console.log(`receita ${data.nomeRecSelec} adicionada`)
    }
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
