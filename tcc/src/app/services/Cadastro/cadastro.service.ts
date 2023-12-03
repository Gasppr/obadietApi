import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cadastro } from './cadastro.model';
import { LoginService } from '../Login/login.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService, private loginService : LoginService) { 

  }

  private url = 'https://obadietapi.vercel.app/obadiet/'


  buscarDoencas(){
    return this.http.get(`${this.url}doencas`)
  }

  buscarRestricoes(){
    return this.http.get(`${this.url}restricoes`)
  }

  mensagem : any
 async fazerCadastro(usuario : Cadastro){

    await  this.http.post(`${this.url}registrar`, usuario).subscribe(
     {
       next: (data: any) => {
         this.mensagem = data.mensgem;
       }
     }
   )

   localStorage.clear()
   await this.storageService.removerToken('token')

   const user = {email : usuario.email ,senha :  usuario.senha}

     setTimeout(()=>{
       this.mensagem = this.loginService.login(user);

       return this.mensagem
     }, 1000)
     

    
  }


  
}
