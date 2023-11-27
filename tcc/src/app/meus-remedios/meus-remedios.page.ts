import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../services/horarios.service';
import { StorageHorarioService } from '../services/storage-horario.service';
import { RecipesService } from '../services/recipes.service';
import { HorarioRemedioComponent } from '../adicionar-horarios/horario-remedio/horario-remedio.component';
import { ModalController } from '@ionic/angular';

interface Id {
  id: number
}

@Component({
  selector: 'app-meus-remedios',
  templateUrl: './meus-remedios.page.html',
  styleUrls: ['./meus-remedios.page.scss'],
})
export class MeusRemediosPage implements OnInit {

  id: Id;
  horariosRemedios: any = []

  constructor(private horarioService: HorariosService, private recipesService: RecipesService, private storage: StorageHorarioService, private modalCtrl: ModalController) {
    this.id = this.iniciarId();
    this.exibirHorariosRemedios();

    setInterval(() => {
      let date = new Date();
      let timeString = '';
      let dateString = '';
      let horas, minutos, segundos;
      let ano, mes, dia;

      if (date.getHours() >= 0 && date.getHours() <= 9) {
        horas = `0${date.getHours()}`
      }
      else horas = `${date.getHours()}`

      if (date.getMinutes() >= 0 && date.getMinutes() <= 9) {
        minutos = `0${date.getMinutes()}`
      }
      else minutos = `${date.getMinutes()}`

      if (date.getSeconds() >= 0 && date.getSeconds() <= 9) {
        segundos = `0${date.getSeconds()}`
      }
      else segundos = `${date.getSeconds()}`

      timeString = `${horas}:${minutos}:${segundos}`
      dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

      
    }, 1000);
  }

  ngOnInit() {
  }

  async exibirHorariosRemedios() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRemedio(token).subscribe({
      next: (data: any) => {
        this.horariosRemedios = data;
      }
    })
  }

  async excluirHorariosRemedios(id: number) {
    this.id = {id: id}
    let token = await this.storage.buscarToken("token");
    await this.horarioService.excluirHorarioRemedio(token, this.id).subscribe({
      next: (data: any) => {
        this.horariosRemedios = data;
      }
    })
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

  displayHorario(horarioParam: string): string {
    let horas, minutos, horarioFinal;
    horas = horarioParam.split(':')[0];
    minutos = horarioParam.split(':')[1];
    horarioFinal = `${horas}:${minutos} h`;
    return horarioFinal;
  }

  isModalRemedioOpen = false;

  setRemedioOpen(isOpen: boolean) {
    this.isModalRemedioOpen = isOpen;
  }

  dataAtual: Date = new Date();
  dataComparacao: string = `${this.dataAtual.getFullYear()}-${this.dataAtual.getMonth()+1}-${this.dataAtual.getDate()}`;

  idHorarioAlert: number = 0;

  pegarIdHorarioAlert(id: number){
    this.idHorarioAlert = id;
  }

  alertRemedioButtons = [{
    text: 'Cancelar',
    role: 'cancel'
  },
  {
    text: 'Excluir',
    role: 'confirm',
    handler: () => {
      this.excluirHorariosRemedios(this.idHorarioAlert);
    }
  }];

  iniciarId(): Id {
    return { id: 0 };
  }
}
