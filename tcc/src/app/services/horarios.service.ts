import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet";

  constructor(private http: HttpClient) { }

  buscarHorarioRemedio():Observable<any>{
    return this.http.get<any>(`${this.URL}/remedios`)
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



  buscarHorarioRefeicao():Observable<any>{
    return  this.http.get<any>(`${this.URL}/refeicoes`)
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
