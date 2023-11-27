import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cadastro } from './cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { 

  }

  private url = 'https://3000-paulor-obadiet-l2351zyi3qy.ws-us106.gitpod.io/obadiet/'


  buscarDoencas(){
    return this.http.get(`${this.url}doencas`)
  }

  buscarRestricoes(){
    return this.http.get(`${this.url}restricoes`)
  }

 fazerCadastro(usuario : Cadastro){
    return this.http.post(`${this.url}registrar` , usuario )
  }
}
