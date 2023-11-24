import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


 interface cadastro1{
  nome : string,
  email : string,
  senha : string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    this.criarStorage();
  }

  async criarStorage() {
    await this.storage.create()
  }

  async guardarCadastro1(chave: string, valor: cadastro1) {
    await this.storage.set(chave, valor)

    return true;
  }

  async buscarCadastro(chave: string) {

    const token = await this.storage.get(chave)

    return token;
  }

  async removerToken(chave: string) {
    const valor = await this.storage.remove(chave)

    return valor;
  }
}
