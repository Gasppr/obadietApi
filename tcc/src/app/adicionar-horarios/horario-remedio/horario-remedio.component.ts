import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';
import { HorariosService } from 'src/app/services/horarios.service';
import { StorageService } from 'src/app/services/Login/storage.service';
import { StorageHorarioService } from 'src/app/services/storage-horario.service';


interface HorarioRemedio{
  idHorario: number;
  data: string;
  nomeRemedio: string;
  repetir: string;
  horarios: string;
  qtdRepeteCada: number;
  quandoRepeteCada: string;
  diasDaSemanaRepeticao: string;
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
  selector: 'app-horario-remedio',
  templateUrl: './horario-remedio.component.html',
  styleUrls: ['./horario-remedio.component.scss'],
})
export class HorarioRemedioComponent  implements OnInit {
  horarioRemedio: HorarioRemedio
  horarioPersonalizado: HorarioPersonalizado

  horariosRemedios: any = []

  constructor(private modalCtrl: ModalController, private horarioService: HorariosService, private storage: StorageHorarioService) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
    this.exibirHorariosRemedio();
   }

  ngOnInit() {}


  iniciarHorarioRemedio(): HorarioRemedio {
    return { idHorario: 0, data: '', nomeRemedio: '', repetir: '', horarios: '', qtdRepeteCada: 0, quandoRepeteCada: '', diasDaSemanaRepeticao: '', qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  async exibirHorariosRemedio() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRemedio(token).subscribe({
      next: (data: any) => {
        this.horariosRemedios.push(data);
      }
    })
    //await this.storage.guardarToken("horarioToken", this.horarioRemedio);
  }

  async criarHorarioRemedio(){
    let token = await this.storage.buscarToken("token");
    await this.horarioService.cadastroHorarioRemedio(token, this.horarioRemedio);
  }

  async editarHorarioRemedio() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.editarHorarioRemedio(token, this.horarioRemedio);
  }

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
    this.horarioRemedio.horarios = datetime.split('T')[1];
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.horarioRemedio.nomeRemedio !== '' && this.horarioRemedio.horarios !== ''){
      if(this.horarioRemedio.repetir === 'Personalizado'){
        this.horarioRemedio.qtdRepeteCada = this.horarioPersonalizado.qtdRepeteCada;
        this.horarioRemedio.quandoRepeteCada = this.horarioPersonalizado.quandoRepeteCada;
        this.horarioRemedio.diasDaSemanaRepeticao = this.horarioPersonalizado.diasSemanaRepeticao.toString();
        this.horarioRemedio.qndTermina = this.horarioPersonalizado.qndTermina;
        this.horarioRemedio.qndTerminaData = this.horarioPersonalizado.qndTerminaData;
        this.horarioRemedio.qndTerminaHorario = this.horarioPersonalizado.qndTerminaHorario;
        this.horarioRemedio.nmrRepeticoesTermino = this.horarioPersonalizado.nmrRepeticoesTermino;
        this.criarHorarioRemedio();
        return this.modalCtrl.dismiss('confirm');
      }
      else {
        this.criarHorarioRemedio();
        return this.modalCtrl.dismiss('confirm');
      }
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
