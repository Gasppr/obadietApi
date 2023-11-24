import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../services/Cadastro/cadastro.service';
import { StorageService } from '../services/Cadastro/storage.service';

interface Usuario {
  peso: number;
  altura: number;
  sexo: string;
  idade: number;
}

@Component({
  selector: 'app-cadastro2',
  templateUrl: './cadastro2.page.html',
  styleUrls: ['./cadastro2.page.scss'],
})
export class Cadastro2Page implements OnInit {
  usuario: Usuario

  constructor(private cadastroService: CadastroService,
    private storage : StorageService) {
      this.usuario = this.iniciarUsuario();
     }

  ngOnInit() {
  }

  iniciarUsuario(): Usuario{
    return { peso: 0, altura: 0, sexo: '', idade: 0 };
  }

  selecionarSexo(e: any) {
    this.usuario.sexo = e.detail.value;
    console.log(this.usuario.sexo);
  }

}
