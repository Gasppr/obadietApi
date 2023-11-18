import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/Login/storage.service';

interface usuarioLogin {
  email : string,
  senha : string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario : usuarioLogin 
 
  constructor(
    private loginService: LoginService,
    private storage : StorageService
  ) {
    this.usuario = this.criarUsuario()
   }

  criarUsuario(): usuarioLogin {
    return { email : '', senha: ''}
  }

   async logar(){
    
    if(!this.usuario) return

    this.loginService.login(this.usuario);

  }
  

}
