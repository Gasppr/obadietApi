import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';


interface HorarioRemedio{
  data: string;
  nomeRemedio: string;
  repetir: string;
  horario: string;
}

@Component({
  selector: 'app-horario-remedio',
  templateUrl: './horario-remedio.component.html',
  styleUrls: ['./horario-remedio.component.scss'],
})
export class HorarioRemedioComponent  implements OnInit {
  horarioRemedio: HorarioRemedio

  constructor(private modalCtrl: ModalController) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
   }

  ngOnInit() {}

  iniciarHorarioRemedio(): HorarioRemedio {
    return { data: '', nomeRemedio: '', repetir: '', horario: '' }
  }

  selecionarData(e: any) {
    this.horarioRemedio.data = e.detail.value;
    console.log(this.horarioRemedio.data);
  }

  selecionarNome(e: any) {
    this.horarioRemedio.nomeRemedio = e.detail.value;
    console.log(this.horarioRemedio.nomeRemedio);
  }

  selecionarHorario(e: any) {
    this.horarioRemedio.horario = e.detail.value;
    console.log(this.horarioRemedio.horario);
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
}
