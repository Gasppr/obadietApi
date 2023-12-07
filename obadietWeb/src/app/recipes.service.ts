import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaModel } from './services/receita.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private readonly URL = "https://obadietapi.vercel.app/obadiet/";

  constructor(private http: HttpClient) { }
    buscarReceitas(): Observable<any> {
    return this.http.get<any>(`${this.URL}receitas`)
  }

  criarReceita(receita : ReceitaModel){
    return this.http.post(`${this.URL}novaReceita` , receita)
  }

  editarReceita(){
    
  }
}
