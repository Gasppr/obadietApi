import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlarmeModalComponent } from '../alarme-modal/alarme-modal.component';


interface HorarioRemedio{
  data: string;
  nomeRemedio: string;
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
  selector: 'app-programacao',
  templateUrl: './programacao.page.html',
  styleUrls: ['./programacao.page.scss'],
})
export class ProgramacaoPage implements OnInit {
  horarioRemedio: HorarioRemedio
  horarioPersonalizado: HorarioPersonalizado

  constructor(private modalCtrl: ModalController) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();


    setInterval(() => {
      let date = new Date();
      let dateString = '';
      let horas, minutos, segundos;
      
      if (date.getHours() >= 0 && date.getHours() <= 9){
        horas = `0${date.getHours()}`
      }
      else horas = `${date.getHours()}`

      if (date.getMinutes() >= 0 && date.getMinutes() <= 9){
        minutos = `0${date.getMinutes()}`
      }
      else minutos = `${date.getMinutes()}`

      if (date.getSeconds() >= 0 && date.getSeconds() <= 9){
        segundos = `0${date.getSeconds()}`
      }
      else segundos = `${date.getSeconds()}`

      dateString = `${horas}:${minutos}:${segundos}`

      console.log(`este é o horaraio ${dateString}`);
  
      this.horarioRemedio.horario = '09:45:00';

      if (this.horarioRemedio.horario == dateString){
        this.openModalAlarme();
      }
  
    }, 1000);
   }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  } 
  
  ngOnInit() {
  }
  dataAtual: Date = new Date();

  iniciarHorarioRemedio(): HorarioRemedio {
    return { data: '', nomeRemedio: '', repetir: '', horario: '' }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  /*adicionarAlarmeTeste(){
    let date = new Date();
    this.horarioRemedio.horario = "01:15:00";
  }*/

  async openModalAlarme() {
    const modal = await this.modalCtrl.create({
      component: AlarmeModalComponent,
    });
    modal.present();

    /*const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.horarioPersonalizado = data;
      console.log(this.horarioPersonalizado);
    }*/
  }
}
