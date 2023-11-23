import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet/";

  constructor(private http: HttpClient) { }
  private receitasSalvasSubject = new BehaviorSubject<any[]>([]);
  receitasSalvas$ = this.receitasSalvasSubject.asObservable();

  buscarReceitas(): Observable<any> {
    return this.http.get<any>(`${this.URL}receitas`)
  }
  buscarDetalhesReceita(receitaId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}receita/${receitaId}`);
  }
  salvarReceita(receita: any) {
    const receitasSalvas = this.receitasSalvasSubject.value;
    this.receitasSalvasSubject.next([...receitasSalvas, receita]);
  }
  removerReceitaSalva(receita: any) {
    const receitasSalvas = this.receitasSalvasSubject.value;
    const index = receitasSalvas.findIndex(r => r.id === receita.id);
    if (index !== -1) {
      receitasSalvas.splice(index, 1);
      this.receitasSalvasSubject.next([...receitasSalvas]);
    }
  }
}