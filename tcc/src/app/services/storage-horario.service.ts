import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageHorarioService {

  constructor(private http: HttpClient , private router : Router, private storage : Storage) { 
  
    this.criarStorage()

  }


  async criarStorage(){
      await this.storage.create()
  }

  async guardarToken(chave : string , valor : any ){
    await this.storage.set(chave, valor)
    
    return true;
  }

  async buscarToken(chave : string){

    const token = await this.storage.get(chave)

    return token;
  }

  async removerToken(chave : string){
    const valor = await this.storage.remove(chave)

    return valor;
  }
}
