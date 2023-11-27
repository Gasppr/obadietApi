import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { StorageService } from '../services/Cadastro/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private storage : StorageService, private router : Router) {
      this.pularTelaInicial()
   }


  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }
  goPrev() {
    this.swiper?.slidePrev();
  }

  swiperSlideChanged(e: any){
    console.log('changed ', e);
  }

  async pularTelaInicial(){
    const existe = await this.storage.buscarCadastro("cadastro")

    if(existe) this.router.navigate(['iniciov2'])

  }
}
