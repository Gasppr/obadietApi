import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alarme-modal',
  templateUrl: './alarme-modal.component.html',
  styleUrls: ['./alarme-modal.component.scss'],
})
export class AlarmeModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
    this.tocarRingtone();
     let timeInterval: ReturnType<typeof setTimeout> = setInterval(() => {
      this.timer++;
      console.log(`este é o timer ${this.timer}`);
      if (this.timer >= this.limiteTimer){
        clearInterval(timeInterval);
        console.log('timer zerado');
      }
    }, 1000);
  }

  ngOnInit() { }

  date = new Date();
  timer: number = 0;
  limiteTimer: number = 10;

  somAlarme = new Audio();
  tocarRingtone() {
    this.somAlarme.src = "../assets/sounds/alarm-sound.mp3";

    let ringtoneRepeat: ReturnType<typeof setTimeout>;

    /*this.somAlarme.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);*/

    ringtoneRepeat = setInterval(() => {
      this.somAlarme.currentTime = 0;
      this.somAlarme.play();
      console.log('tocando alarme');
      if (this.timer >= this.limiteTimer){
        this.somAlarme.pause();
        clearInterval(ringtoneRepeat);
        this.pararAlarme();
      }
    }, 1000);
  }

  pararAlarme() {
    this.timer += 500;
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
