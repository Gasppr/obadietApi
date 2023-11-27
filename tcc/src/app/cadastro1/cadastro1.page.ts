import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CadastroService } from '../services/Cadastro/cadastro.service';
import { StorageService } from '../services/Cadastro/storage.service';
import { Router } from '@angular/router';

export class Usuario {
  nome: string = '';
  email: string = '';
  senha: string = '';
}

@Component({
  selector: 'app-cadastro1',
  templateUrl: './cadastro1.page.html',
  styleUrls: ['./cadastro1.page.scss'],
})
export class Cadastro1Page implements OnInit {
  usuario: Usuario


  constructor(private cadastroService: CadastroService,
    private storage : StorageService, private router: Router) {
    this.usuario = this.iniciarUsuario();
  }

  ngOnInit() {
  }

  senha1: string = '';
  senha2: string = '';



  iniciarUsuario(): Usuario{
    return { nome: '', email: '', senha: ''}
  }

  async compararSenha(){
    if (this.senha1 == this.senha2){
      this.usuario.senha = this.senha1

      
      const passa =  await this.storage.guardarCadastro("cadastro" ,  this.usuario)

      if(passa){
        await this.router.navigate(['cadastro2']);
      }
      
    }
    else this.setOpen(true);
  }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }



}
