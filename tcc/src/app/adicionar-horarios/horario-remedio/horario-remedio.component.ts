import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioPersonalizadoComponent } from '../horario-personalizado/horario-personalizado.component';

@Component({
  selector: 'app-horario-remedio',
  templateUrl: './horario-remedio.component.html',
  styleUrls: ['./horario-remedio.component.scss'],
})
export class HorarioRemedioComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
