import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private http: HttpClient , private router : Router, private storage : Storage) { 
  
    this.criarStorage()

  }


  async criarStorage(){
      await this.storage.create()
  }

  async guardarToken(chave : string , valor : string ){
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