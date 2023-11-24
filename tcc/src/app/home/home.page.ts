import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor() {}

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
  dataAtual: Date = new Date();
}
