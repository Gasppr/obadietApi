import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../services/Cadastro/cadastro.service';
import { StorageService } from '../services/Cadastro/storage.service';
import { Router } from '@angular/router';

class Usuario {
  nome: string = '';
  email: string = '';
  senha: string = '';
  peso: number = 0;
  altura: number = 0;
  sexo: string = '';
  idade: number = 0;
}

@Component({
  selector: 'app-cadastro2',
  templateUrl: './cadastro2.page.html',
  styleUrls: ['./cadastro2.page.scss'],
})
export class Cadastro2Page implements OnInit {
  usuario: Usuario;

  constructor(
    private cadastroService: CadastroService,
    private storage: StorageService,
    private router: Router
  ) {
    this.usuario = this.iniciarUsuario();
  }

  ngOnInit() {}

  iniciarUsuario(): Usuario {
    return {
      nome: '',
      email: '',
      senha: '',
      peso: 0,
      altura: 0,
      sexo: '',
      idade: 0,
    };
  }

  async continuarCadastro() {
    const usuarioLocalStorage = await this.storage.buscarCadastro('cadastro');

    this.usuario.nome = usuarioLocalStorage.nome;
    this.usuario.email = usuarioLocalStorage.email;
    this.usuario.senha = usuarioLocalStorage.senha;

    if (
      this.usuario.altura != 0 &&
      this.usuario.peso != 0 &&
      this.usuario.idade != 0 &&
      this.usuario.sexo != ''
    ) {
      await this.storage.guardarCadastro('cadastro', this.usuario);
      await this.router.navigate(['cadastro3']);
    } else this.setOpen(true);
  }

  selecionarSexo(e: any) {
    this.usuario.sexo = e.detail.value;
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
