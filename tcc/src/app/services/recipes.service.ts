import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet/";

  constructor(private http: HttpClient) { }

  buscarReceitas(): Observable<any> {
    return this.http.get<any>(`${this.URL}receitas`)
  }
  buscarDetalhesReceita(receitaId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}receita/${receitaId}`);
  }
  
}