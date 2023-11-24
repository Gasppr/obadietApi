import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet";

  constructor(private http: HttpClient) { }

  buscarHorarioRemedio(id: string):Observable<any>{
    return this.http.get(`${this.URL}/remedios/${id}`, )
  }

  cadastroHorarioRemedio(id: string, horarioRemedio: {}): Observable<any> {
    return this.http.post<any>(`${this.URL}/CriarHorarioRemedios/${id}`, horarioRemedio);
  }

  atualizarHorarioRemedio(horarioRemedio: {}): Observable<any> {
    return this.http.patch<any>(`${this.URL}/editarHorarioRemedio`, horarioRemedio);
  }

  excluirHorarioRemedio(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/deletarHorarioRemedio/${id}`)
  }



  buscarHorarioRefeicao(id: string):Observable<any>{
    return  this.http.get<any>(`${this.URL}/refeicoes/${id}`)
  }

  cadastroHorarioRefeicao(id: string, horarioRefeicao: {}): Observable<any> {
    return this.http.post<any>(`${this.URL}/CriarHorarioRefeicoes/${id}`, horarioRefeicao);
  }

  atualizarHorarioRefeicao(horarioRefeicao: {}): Observable<any> {
    return this.http.patch<any>(`${this.URL}/editarHorarioRefeicao`, horarioRefeicao);
  }

  excluirHorarioRefeicao(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/deletarHorarioRefeicao/${id}`)
  }
}
