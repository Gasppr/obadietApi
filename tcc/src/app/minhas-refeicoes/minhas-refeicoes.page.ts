import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-minhas-refeicoes',
  templateUrl: './minhas-refeicoes.page.html',
  styleUrls: ['./minhas-refeicoes.page.scss'],
})
export class MinhasRefeicoesPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor() {}

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

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any){
  }
}