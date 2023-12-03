import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../services/Cadastro/cadastro.service';
import { StorageService } from '../services/Cadastro/storage.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/Login/login.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

class Usuario {
  nome: string = '';
  email: string = '';
  senha: string = '';
  peso: number = 0;
  altura: number = 0;
  sexo: string = '';
  idade: number = 0;
  restricao: string[] = [];
  doencas: string[] = [];
}

@Component({
  selector: 'app-cadastro3',
  templateUrl: './cadastro3.page.html',
  styleUrls: ['./cadastro3.page.scss'],
})
export class Cadastro3Page implements OnInit {

  cadastro3 = new FormGroup({
    comorbidades : new FormControl('', Validators.required),
    doencas: new FormControl('', Validators.required)
  })

  usuario: Usuario;
  doencas?: any[];
  restricao?: any[];

  constructor(
    private cadastroService: CadastroService,
    private storage: StorageService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.cadastroIncompleto();
    this.carregarDoencasERestricoes();
    this.usuario = this.iniciarUsuario();
   
  }

  ngOnInit() {}

  iniciarUsuario(): Usuario {
    return {
      nome: '',
      email: '',
      sexo: '',
      idade: 0,
      peso: 0,
      altura: 0,
      senha: '',
      restricao: [],
      doencas: [],
    };
  }

  carregarDoencasERestricoes() {
    this.cadastroService.buscarDoencas().subscribe({
      next: (data: any) => {
        this.doencas = data;
      },
    });
    this.cadastroService.buscarRestricoes().subscribe({
      next: (data: any) => {
        this.restricao = data;
      },
    });
  }

  selecionarRestricoes(e: any) {
    let arrayRestricao: any[] = [];

    arrayRestricao.push(e.detail.value);

    this.usuario.restricao = arrayRestricao[0];

  }

  selecionarDoencas(e: any) {
    let arrayDoencas: any[] = [];

    arrayDoencas.push(e.detail.value);

    this.usuario.doencas = arrayDoencas[0];

  }

  mensagem : any

  async continuarCadastro() {
    const usuarioLocalStorage = await this.storage.buscarCadastro('cadastro');

    this.usuario.nome = usuarioLocalStorage.nome;
    this.usuario.email = usuarioLocalStorage.email;
    this.usuario.senha = usuarioLocalStorage.senha;
    this.usuario.peso = usuarioLocalStorage.peso;
    this.usuario.altura = usuarioLocalStorage.altura;
    this.usuario.sexo = usuarioLocalStorage.sexo;
    this.usuario.idade = usuarioLocalStorage.idade;

    await this.storage.guardarCadastro('cadastro', this.usuario);

    const usuario = await this.storage.buscarCadastro('cadastro');

    this.mensagem =  await this.cadastroService.fazerCadastro(usuario);

    
  }


  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  

  async cadastroIncompleto() {
    const user = await this.storage.buscarCadastro('cadastro');

    if (user.email === '') await this.router.navigate(['cadastro1']);
    else if (user.sexo == '') await this.router.navigate(['cadastro2']);
  }
}
