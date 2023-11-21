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
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  selecionarTermino(e: any) {
    this.horarioPersonalizado.qndTermina = e.detail.value;
    console.log(this.horarioPersonalizado.qndTermina);
  }

  selecionarDiasSemana(e: any) {
    if (e.detail.checked == true) {
      if (this.horarioPersonalizado.diasSemanaRepeticao.length == 0) {
        this.horarioPersonalizado.diasSemanaRepeticao.push(e.detail.value);
        console.log('não tem nada');
      }
      else {
        if (e.detail.value !== this.horarioPersonalizado.diasSemanaRepeticao) {
          this.horarioPersonalizado.diasSemanaRepeticao.push(e.detail.value);
          console.log('não tem repetido');
        }
      }
    }
    else if (e.detail.checked == false) {
      this.horarioPersonalizado.diasSemanaRepeticao.splice(this.horarioPersonalizado.diasSemanaRepeticao.indexOf(e.detail.value), 1);
      console.log('apagou');
    }

    console.log(this.horarioPersonalizado.diasSemanaRepeticao);
  }

  selecionarQndRepeteCada(e: any) {
    this.horarioPersonalizado.quandoRepeteCada = e.detail.value;
    console.log(this.horarioPersonalizado.quandoRepeteCada, this.horarioPersonalizado.qtdRepeteCada);
  }

  selecionarDataHorario(e: any) {
    let horario = e.detail.value;
    this.horarioPersonalizado.qndTerminaData = e.detail.value;
    this.horarioPersonalizado.qndTerminaHorario = e.detail.value;
    console.log(this.horarioPersonalizado.qndTerminaData);
    console.log(this.horarioPersonalizado.qndTerminaHorario);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
}
