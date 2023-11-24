import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';
import { HorariosService } from 'src/app/services/horarios.service';
import { StorageService } from 'src/app/services/Login/storage.service';


interface HorarioRemedioPersonalizado{
  horarioRemedio: HorarioRemedio;
  horarioPersonalizado: HorarioPersonalizado;
}

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
  selector: 'app-horario-remedio',
  templateUrl: './horario-remedio.component.html',
  styleUrls: ['./horario-remedio.component.scss'],
})
export class HorarioRemedioComponent  implements OnInit {
  horarioRemedio: HorarioRemedio
  horarioPersonalizado: HorarioPersonalizado
  horarioRemedioPersonalizado: HorarioRemedioPersonalizado

  constructor(private modalCtrl: ModalController, private horarioService: HorariosService) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
    this.horarioRemedioPersonalizado = this.iniciarHorarioRemedioPersonalizado();
   }

  ngOnInit() {}

  iniciarHorarioRemedioPersonalizado(){
    return { horarioRemedio: { data: '', nomeRemedio: '', repetir: '', horario: '' }, horarioPersonalizado: {qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0}}
  }

  iniciarHorarioRemedio(): HorarioRemedio {
    return { data: '', nomeRemedio: '', repetir: '', horario: '' }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  /*salvarHorarioRemedio(){
    
    this.horarioService.cadastroHorarioRemedio(token, this.horarioRemedioPersonalizado).subscribe({
      next: async (data: any) => {
        
      }
    })
  }*/

  selecionarData(e: any) {
    let datetime = e.detail.value;
    this.horarioRemedio.data = datetime.split('T')[0];
  }

  selecionarRepeticao(e: string) {
    this.horarioRemedio.repetir = e;
    if (e !== 'Personalizado'){
      this.modalCtrl.dismiss();
    }
  }

  selecionarHorario(e: any) {
    let datetime = e.detail.value;
    this.horarioRemedio.horario = datetime.split('T')[1];
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.horarioRemedio.nomeRemedio !== '' && this.horarioRemedio.horario !== ''){
      this.horarioRemedioPersonalizado.horarioRemedio = this.horarioRemedio;

      if(this.horarioRemedio.repetir === 'Personalizado'){
        this.horarioRemedioPersonalizado.horarioPersonalizado = this.horarioPersonalizado;
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

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
