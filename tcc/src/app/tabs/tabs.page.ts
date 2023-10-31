import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioRefeicaoComponent } from '../adicionar-horarios/horario-refeicao/horario-refeicao.component';
import { HorarioRemedioComponent } from '../adicionar-horarios/horario-remedio/horario-remedio.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModalRefeicao() {
    const modal = await this.modalCtrl.create({
      component: HorarioRefeicaoComponent,
    });
    modal.present();

    /*const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }*/
  }

  async openModalRemedio() {
    const modal = await this.modalCtrl.create({
      component: HorarioRemedioComponent,
    });
    modal.present();

    /*const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }*/
  }
}
