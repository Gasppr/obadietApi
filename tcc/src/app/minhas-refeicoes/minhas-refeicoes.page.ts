import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { HorariosService } from '../services/horarios.service';
import { StorageHorarioService } from '../services/storage-horario.service';

interface Id {
  id: number
}

@Component({
  selector: 'app-minhas-refeicoes',
  templateUrl: './minhas-refeicoes.page.html',
  styleUrls: ['./minhas-refeicoes.page.scss'],
})
export class MinhasRefeicoesPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  id: Id;
  horariosRefeicoes: any = [];

  constructor(private horarioService: HorariosService, private storage: StorageHorarioService) {
    this.id = this.iniciarId();
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  } 

  comidas = [
    {
      image: "assets/images/camaroes-deliciosos.png"
    },
    {
      image: "assets/images/camaroes-deliciosos.png"
    },
    {
      image: "assets/images/camaroes-deliciosos.png"
    },
    {
      image: "assets/images/camaroes-deliciosos.png"
    }
  ]

  async excluirHorariosRefeicoes(id: number) {
    this.id = {id: id}
    let token = await this.storage.buscarToken("token");
    await this.horarioService.excluirHorarioRefeicao(token, this.id).subscribe({
      next: (data: any) => {
        this.horariosRefeicoes = data;
        console.log(this.horariosRefeicoes)
      }
    })
  }

  displayHorario(horarioParam: string): string {
    let horas, minutos, horarioFinal;
    horas = horarioParam.split(':')[0];
    minutos = horarioParam.split(':')[1];
    horarioFinal = `${horas}:${minutos} h`;
    return horarioFinal;
  }

  idHorarioAlert: number = 0;

  pegarIdHorarioAlert(id: number){
    this.idHorarioAlert = id;
    console.log(this.idHorarioAlert)
  }

  alertRefeicaoButtons = [{
    text: 'Cancelar',
    role: 'cancel'
  },
  {
    text: 'Excluir',
    role: 'confirm',
    handler: () => {
      this.excluirHorariosRefeicoes(this.idHorarioAlert);
    }
  }];

  iniciarId(): Id {
    return { id: 0 };
  }

  isModalRefeicaoOpen = false;

  setRefeicaoOpen(isOpen: boolean) {
    this.isModalRefeicaoOpen = isOpen;
  }

  dataAtual: Date = new Date();
  dataComparacao: string = `${this.dataAtual.getFullYear()}-${this.dataAtual.getMonth()+1}-${this.dataAtual.getDate()}`;

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any){
  }
}