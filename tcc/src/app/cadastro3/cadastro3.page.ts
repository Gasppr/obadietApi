import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../services/Cadastro/cadastro.service';
import { StorageService } from '../services/Cadastro/storage.service';

interface Usuario {
  restricoes: string[];
  doencas: string[];
}

@Component({
  selector: 'app-cadastro3',
  templateUrl: './cadastro3.page.html',
  styleUrls: ['./cadastro3.page.scss'],
})
export class Cadastro3Page implements OnInit {
  usuario: Usuario

  constructor(private cadastroService: CadastroService,
    private storage : StorageService) {
      this.usuario = this.iniciarUsuario();
    }

  ngOnInit() {
  }

  iniciarUsuario(): Usuario{
    return { restricoes: [], doencas: [] };
  }

  selecionarRestricoes(e: any) {
    this.usuario.restricoes.push(e.detail.value);
    console.log(this.usuario.restricoes);
  }

  selecionarDoencas(e: any) {
    this.usuario.doencas.push(e.detail.value);
    console.log(this.usuario.doencas);
  }
}
