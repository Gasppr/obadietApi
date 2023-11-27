import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';
import { ExibirReceitasSalvasComponent } from './exibir-receitas-salvas/exibir-receitas-salvas.component';
import { HorariosService } from 'src/app/services/horarios.service';
import { StorageHorarioService } from 'src/app/services/storage-horario.service';

interface Receita{
  idReceita: number;
  nome: string;
  img: string;
}

interface HorarioRefeicao{
  data: string;
  tipo: string;
  receitas: Receita[];
  repetir: string;
  horario: string;
  qtdRepeteCada: number;
  quandoRepeteCada: string;
  diasSemanaRepeticao: string[];
  qndTermina: string;
  qndTerminaData: string;
  qndTerminaHorario: string;
  nmrRepeticoesTermino: number;
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

  constructor(private modalCtrl: ModalController, private horarioService: HorariosService, private storage: StorageHorarioService) {
    this.horarioRefeicao = this.iniciarHorarioRefeicao();
    this.receita = this.iniciarReceita();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
  }

  async criarHorarioRefeicao(){
    let token = await this.storage.buscarToken("token");
    await this.horarioService.cadastroHorarioRefeicao(token, this.horarioRefeicao).subscribe({
      next: async (data: any) => {
        
      }
    })
  }

  iniciarHorarioRefeicao(): HorarioRefeicao {
    return { data: '', tipo: '', receitas: [], repetir: '', horario: '', qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
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
  }

  selecionarRefeicao(e: any) {
    this.horarioRefeicao.tipo = e.detail.value;
  }

  selecionarData(e: any) {
    let datetime = e.detail.value;
    this.horarioRefeicao.data = datetime.split('T')[0];
  }

  selecionarHorario(e: any) {
    let datetime = e.detail.value;
    this.horarioRefeicao.horario = datetime.split('T')[1];
  }

  selecionarRepeticao(e: string) {
    this.horarioRefeicao.repetir = e;
    if (e !== 'Personalizado'){
      this.modalCtrl.dismiss();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.horarioRefeicao.tipo !== '' && this.horarioRefeicao.horario !== ''){
      if(this.horarioRefeicao.repetir === 'Personalizado'){
        this.horarioRefeicao.qtdRepeteCada = this.horarioPersonalizado.qtdRepeteCada;
        this.horarioRefeicao.quandoRepeteCada = this.horarioPersonalizado.quandoRepeteCada;
        this.horarioRefeicao.diasSemanaRepeticao = this.horarioPersonalizado.diasSemanaRepeticao;
        this.horarioRefeicao.qndTermina = this.horarioPersonalizado.qndTermina;
        this.horarioRefeicao.qndTerminaData = this.horarioPersonalizado.qndTerminaData;
        this.horarioRefeicao.qndTerminaHorario = this.horarioPersonalizado.qndTerminaHorario;
        this.horarioRefeicao.nmrRepeticoesTermino = this.horarioPersonalizado.nmrRepeticoesTermino;
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
    }
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
