import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-horario-personalizado',
  templateUrl: './horario-personalizado.component.html',
  styleUrls: ['./horario-personalizado.component.scss'],
})
export class HorarioPersonalizadoComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
}
