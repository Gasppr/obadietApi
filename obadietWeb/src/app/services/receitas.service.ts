import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaModel } from './receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  constructor(private http : HttpClient) { 
    
  }

  private url = "https://obadietapi.vercel.app/obadiet/"

   buscarReceitas(){
    return this.http.get<any>(`${this.url}receitas`)

  }

  criarReceita(receita : ReceitaModel){
    return this.http.post(`${this.url}novaReceita` , receita)
  }

}


