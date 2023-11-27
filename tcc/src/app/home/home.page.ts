import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { HorariosService } from '../services/horarios.service';
import { StorageHorarioService } from '../services/storage-horario.service';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  horariosRemedios: any = [];
  horariosRefeicoes: any = [];
  remediosHome: any = [];
  refeicoesHome: any = [];

  constructor(private horarioService: HorariosService, private recipesService: RecipesService, private storage: StorageHorarioService) {
    this.exibirHorariosRefeicoes();
    this.exibirHorariosRemedios();
    let timeString = '';
    let dateString = '';
    
    setInterval(() => {
      let date = new Date();
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

      timeString = `${horas}:${minutos}:${segundos}`
      dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    }, 1000);

    if (this.horariosRemedios.length > 0){
      for (let i = 0; i < this.horariosRemedios.length; i++){
        if (this.horariosRemedios[i].data == dateString){
          this.remediosHome.push(this.horariosRemedios[i]);
        }
      }
      this.remediosHome.sort((firstItem: any, secondItem: any) => firstItem.horarios - secondItem.horarios);
      console.log(this.remediosHome)
    }

    if (this.horariosRefeicoes.length > 0){
      for (let i = 0; i < this.horariosRefeicoes.length; i++){
        if (this.horariosRefeicoes[i].data == dateString){
          this.refeicoesHome.push(this.horariosRefeicoes[i]);
        }
      }
      this.refeicoesHome.sort((firstItem: any, secondItem: any) => firstItem.horarios - secondItem.horarios);
      console.log(this.refeicoesHome)
    }
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

  async exibirHorariosRemedios() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRemedio(token).subscribe({
      next: (data: any) => {
        this.horariosRemedios = data;
        console.log(this.horariosRemedios, this.horariosRemedios.length, token)
      }
    })
  }

  async exibirHorariosRefeicoes() {
    let token = await this.storage.buscarToken("token");
    await this.horarioService.buscarHorarioRefeicao(token).subscribe({
      next: (data: any) => {
        this.horariosRefeicoes = data;
        console.log(this.horariosRefeicoes)
      }
    })
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any){
  }
  dataAtual: Date = new Date();
}
