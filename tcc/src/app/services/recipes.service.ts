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
    return this.http.get(`${this.URL}receita/${receitaId}`);
  }

  buscarReceitasSalvas(token: string): Observable<any> {
    return this.http.get<any>(`${this.URL}receitasSalvas/${token}`);
  }

  /*salvarReceita(salvo : {usuarios_id: string, receita_id: number}): Observable<any>{
    return this.http.post<any>(`${this.URL}salvarReceita/`, salvo);
  }

  removerReceitaSalva(receita : {}): Observable<any> {
    return this.http.delete<any>(`${this.URL}deletaSalvo/`, receita);
  }*/

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
      receita.favorita = false;
    }
  }

  isReceitaSalva(receita: any): boolean {
    const receitasSalvas = this.receitasSalvasSubject.value;
    return receitasSalvas.some(r => r.id === receita.id);
  }
}
