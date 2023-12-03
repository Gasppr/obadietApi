import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/Login/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  login = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  usuario : usuarioLogin 
  resposta : any 
 
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

    await localStorage.clear()
    await localStorage.clear()
    
  

    this.resposta = this.loginService.login(this.usuario);
      setTimeout(() =>{
        this.entrar(this.resposta)
          
      }, 4000 )
  }

    entrar(resposta : any ){
      if(resposta != true ){
        this.setOpen(true)
       
     }
    }

  isToastOpen = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  

}
