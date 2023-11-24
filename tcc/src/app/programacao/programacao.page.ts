import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlarmeModalComponent } from '../alarme-modal/alarme-modal.component';
import { HorariosService } from '../services/horarios.service';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import Swiper from 'swiper';


interface HorarioRemedio {
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

interface HorarioRemedioPersonalizado {
  horarioRemedio: HorarioRemedio;
  horarioPersonalizado: HorarioPersonalizado;
}

interface Receita {
  idReceita: number;
  nome: string;
  img: string;
}

interface HorarioRefeicaoPersonalizado {
  horarioRefeicao: HorarioRefeicao;
  horarioPersonalizado: HorarioPersonalizado;
}

interface HorarioRefeicao {
  data: string;
  tipo: string;
  receitas: Receita[];
  repetir: string;
  horario: string;
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
  
  horarioRemedio: HorarioRemedio
  horarioPersonalizado: HorarioPersonalizado
  horarioRefeicao: HorarioRefeicao
  receita: Receita;
  horarioRefeicaoPersonalizado: HorarioRefeicaoPersonalizado;
  horarioRemedioPersonalizado: HorarioRemedioPersonalizado

  receitas: any = [];
  horariosRemedios: HorarioRemedioPersonalizado[] = [{ horarioRemedio: { data: '2023-11-24', nomeRemedio: 'Ibuprofeno', horario: '05:00:00', repetir: 'Não repetir' }, horarioPersonalizado: { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 } }];
  horariosRefeicoes: HorarioRefeicaoPersonalizado[] = [{ horarioRefeicao: { data: '2023-11-24', tipo: 'Café da tarde', receitas: [{ idReceita: 1, nome: 'Torta de maracujá sem açúcar e sem lactose', img: 'https://guiadacozinha.com.br/wp-content/uploads/2020/03/torta-maracuja-sem-acucar-sem-lactose-1.jpg' }, { idReceita: 2, nome: 'Caponata de berinjela', img: 'https://guiadacozinha.com.br/wp-content/uploads/2020/03/caponata-de-berinjela-1.jpg' }, { idReceita: 3, nome: 'Pudim diet de leite', img: 'https://guiadacozinha.com.br/wp-content/uploads/2020/03/pudim-diet-de-leite-1.jpg' }], repetir: 'Não repetir', horario: '04:16:00' }, horarioPersonalizado: { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 } }];

  constructor(private modalCtrl: ModalController, private horarioService: HorariosService, private receitasService: RecipesService, private router: Router) {
    this.horarioRemedio = this.iniciarHorarioRemedio();
    this.horarioPersonalizado = this.iniciarHorarioPersonalizado();
    this.horarioRemedioPersonalizado = this.iniciarHorarioRemedioPersonalizado();
    this.horarioRefeicao = this.iniciarHorarioRefeicao();
    this.receita = this.iniciarReceita();
    this.horarioRefeicaoPersonalizado = this.iniciarHorarioRefeicaoPersonalizado();

    this.exibirHorariosRefeicoes();
    this.exibirHorariosRemedio();

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

      console.log(`este é o horaraio ${dateString}`);

      this.horarioRemedio.horario = '09:45:00';

      for (let i = 0; i < this.horariosRemedios.length; i++) {
        if (this.horariosRemedios[i].horarioRemedio.horario == dateString) {
          this.openModalAlarme();
        }
      }
      for (let i = 0; i < this.horariosRefeicoes.length; i++) {
        if (this.horariosRefeicoes[i].horarioRefeicao.horario == dateString) {
          this.openModalAlarme();
        }
      }

    }, 1000);
  }

  exibirQuaisHorarios: string = 'todos';

  mudarQualHorarioExibir(e: string){
    this.exibirQuaisHorarios = e;
    console.log(e);
  }

  exibirHorariosRemedio() {
    this.horarioService.buscarHorarioRemedio().subscribe({
      next: (data: any) => {
        this.horariosRemedios.push(data);
        console.log(this.horariosRemedios)
      }
    })
  }

  exibirHorariosRefeicoes() {
    this.horarioService.buscarHorarioRefeicao().subscribe({
      next: (data: any) => {
        this.horariosRefeicoes.push(data);
        console.log(this.horariosRefeicoes)
      }
    })
  }

  varReceitaBuscar: any = {}

  buscarReceita(id: number){
    this.varReceitaBuscar =  this.receitasService.buscarDetalhesReceita(`${id}`);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any){
    console.log('changed ', e);
  }

  displayHorario(horarioParam: string): string {
    let horas, minutos, horarioFinal;
    horas = horarioParam.split(':')[0];
    minutos = horarioParam.split(':')[1];
    horarioFinal = `${horas}:${minutos} h`;
    return horarioFinal;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
  }
  dataAtual: Date = new Date();

  iniciarHorarioRemedio(): HorarioRemedio {
    return { data: '', nomeRemedio: '', repetir: '', horario: '' }
  }

  iniciarHorarioPersonalizado(): HorarioPersonalizado {
    return { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 }
  }

  iniciarHorarioRemedioPersonalizado() {
    return { horarioRemedio: { data: '', nomeRemedio: '', repetir: '', horario: '' }, horarioPersonalizado: { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 } }
  }

  iniciarHorarioRefeicaoPersonalizado(): HorarioRefeicaoPersonalizado {
    return { horarioRefeicao: { data: '', tipo: '', receitas: [], repetir: '', horario: '' }, horarioPersonalizado: { qtdRepeteCada: 0, quandoRepeteCada: '', diasSemanaRepeticao: [], qndTermina: '', qndTerminaData: '', qndTerminaHorario: '', nmrRepeticoesTermino: 0 } }
  }
  iniciarHorarioRefeicao(): HorarioRefeicao {
    return { data: '', tipo: '', receitas: [], repetir: '', horario: '' }
  }

  iniciarReceita(): Receita {
    return { idReceita: 0, nome: '', img: '' }
  }

  /*adicionarAlarmeTeste(){
    let date = new Date();
    this.horarioRemedio.horario = "01:15:00";
  }*/

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
