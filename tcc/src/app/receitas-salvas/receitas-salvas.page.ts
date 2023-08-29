import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receitas-salvas',
  templateUrl: './receitas-salvas.page.html',
  styleUrls: ['./receitas-salvas.page.scss'],
})
export class ReceitasSalvasPage implements OnInit {

  constructor() { }

  comidas = [
    {
      image: "assets/images/camaroes-deliciosos.png",
      title: "Camarões"
    },
    {
      image: "assets/images/camaroes-deliciosos.png",
      title: "Camarões"
    },
    {
      image: "assets/images/camaroes-deliciosos.png",
      title: "Camarões"
    },
    {
      image: "assets/images/camaroes-deliciosos.png",
      title: "Camarões"
    }
  ]

  ngOnInit() {
  }

}
