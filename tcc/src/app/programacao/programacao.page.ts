import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlarmeModalComponent } from '../alarme-modal/alarme-modal.component';
import { HorariosService } from '../services/horarios.service';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import Swiper from 'swiper';
import { StorageHorarioService } from '../services/storage-horario.service';


interface HorarioRemedio {
  id: number;
  data: string;
  nomeRemedio: string;
  repetir: string;
  horario: string;
  qtdRepeteCada: number;
  quandoRepeteCada: string;
  diasSemanaRepeticao: string[];
  qndTermina: string;
  qndTerminaData: string;
  qndTerminaHorario: string;
  nmrRepeticoesTermino: number;
}

interface Receita {
  idReceita: number;
  nome: string;
  img: string;
}

interface HorarioRefeicao {
  id: number;
  data: string;
  tipo: string;
  receitas: Receita[];
  repetir: string;
  horario: string;
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
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  
  receita: Receita;
  horarioRefeicao: HorarioRefeicao;
  horarioRemedio: HorarioRemedio;

  receitas: any = [];
  horariosRemedios: any = [];
  horariosRefeicoes: any = [];


  constructor(private modalCtrl: ModalController, private horarioService: HorariosService, private receitasService: RecipesService, private router: Router, private storage: StorageHorarioService) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
    this.horarioRefeicao = this.iniciarHorarioRefeicao();
    this.receita = this.iniciarReceita();
    this.exibirHorariosRemedios();
    this.exibirHorariosRefeicoes();

    /*this.exibirHorariosRefeicoes();
    this.exibirHorariosRemedio();*/

    setInterval(() => {
      let date = new Date();
      let dateString = '';
      let horas, minutos, segundos;

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

      dateString = `${horas}:${minutos}:${segundos}`


      for (let i = 0; i < this.horariosRemedios.length; i++) {
        if (this.horariosRemedios[i].horario == dateString) {
          this.openModalAlarme();
        }
      }
      for (let i = 0; i < this.horariosRefeicoes.length; i++) {
        if (this.horariosRefeicoes[i].horario == dateString) {
          this.openModalAlarme();
        }
      }
    }, 1000);
  }

  selecionarData(e: any) {
    let datetime = e.detail.value;
    this.dataComparacao = datetime.split('T')[0];
  }

  dataAtual: Date = new Date();
  dataComparacao: string = `${this.dataAtual.getFullYear()}-${this.dataAtual.getMonth()}-${this.dataAtual.getDate()}`;

  exibirQuaisHorarios: string = 'Sua programação';

  mudarQualHorarioExibir(e: string){
    this.exibirQuaisHorarios = e;
  }


  async exibirHorariosRemedios() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRemedio(token).subscribe({
      next: (data: any) => {
        this.horariosRemedios = data;
        console.log(this.horariosRemedios, token)
      }
    })
    //await this.storage.guardarToken("horarioToken", this.horarioRemedio);
  }

  async exibirHorariosRefeicoes() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRefeicao(token).subscribe({
      next: (data: any) => {
        this.horariosRefeicoes = data;
        console.log(this.horariosRefeicoes)
      }
    })
    await this.storage.guardarToken("horarioToken", this.horarioRemedio);
  }

  varReceitaBuscar: any = {}

  buscarReceita(id: number){
    this.varReceitaBuscar =  this.receitasService.buscarDetalhesReceita(`${id}`);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any){
  }

  displayHorario(horarioParam: string): string {
    let horas, minutos, horarioFinal;
    horas = horarioParam.split(':')[0];
    minutos = horarioParam.split(':')[1];
    horarioFinal = `${horas}:${minutos} h`;
    return horarioFinal;
  }

  isModalRefeicaoOpen = false;
  isModalRemedioOpen = false;

  setRefeicaoOpen(isOpen: boolean) {
    this.isModalRefeicaoOpen = isOpen;
  }

  setRemedioOpen(isOpen: boolean) {
    this.isModalRemedioOpen = isOpen;
  }

  ngOnInit() {
  }
  
  iniciarHorarioRemedio(): HorarioRemedio {
    return { id: 0, data: '', nomeRemedio: '', repetir: '', horario: '', qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  iniciarHorarioRefeicao(): HorarioRefeicao {
    return { id: 0, data: '', tipo: '', receitas: [], repetir: '', horario: '', qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  iniciarReceita(): Receita {
    return { idReceita: 0, nome: '', img: '' }
  }


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
