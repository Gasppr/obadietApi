import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  selector: 'app-horario-personalizado',
  templateUrl: './horario-personalizado.component.html',
  styleUrls: ['./horario-personalizado.component.scss'],
})
export class HorarioPersonalizadoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
  }

  horarioPersonalizado: HorarioPersonalizado

  ngOnInit() { }

  ocorrencia: string = 'ocorrência(s)'
  
  ocorrenciaString() {
    if (this.horarioPersonalizado.nmrRepeticoesTermino > 1){
      this.ocorrencia = 'ocorrências'
    }
    else if (this.horarioPersonalizado.nmrRepeticoesTermino == 1){
      this.ocorrencia = 'ocorrência'
    }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 1, quandoRepeteCada: 'semana', diasSemanaRepeticao: [], qndTermina: 'nunca', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  selecionarTermino(e: any) {
    this.horarioPersonalizado.qndTermina = e.detail.value;
  }

  selecionarDiasSemana(e: any) {
    if (e.detail.checked == true) {
      if (this.horarioPersonalizado.diasSemanaRepeticao.length == 0) {
        this.horarioPersonalizado.diasSemanaRepeticao.push(e.detail.value);
      }
      else {
        if (e.detail.value !== this.horarioPersonalizado.diasSemanaRepeticao) {
          this.horarioPersonalizado.diasSemanaRepeticao.push(e.detail.value);
        }
      }
    }
    else if (e.detail.checked == false) {
      this.horarioPersonalizado.diasSemanaRepeticao.splice(this.horarioPersonalizado.diasSemanaRepeticao.indexOf(e.detail.value), 1);
    }
  }

  selecionarQndRepeteCada(e: any) {
    this.horarioPersonalizado.quandoRepeteCada = e.detail.value;
  }

  selecionarDataHorario(e: any) {
    let datetime = e.detail.value;
    this.horarioPersonalizado.qndTerminaData = datetime.split('T')[0];
    this.horarioPersonalizado.qndTerminaHorario = datetime.split('T')[1];
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.horarioPersonalizado, 'confirm');
  }
}
