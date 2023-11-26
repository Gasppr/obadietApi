import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet";

  constructor(private http: HttpClient) { }

  buscarHorarioRemedio(token: string):Observable<any>{
    return this.http.get(`${this.URL}/remedios/${token}`)
  }

  cadastroHorarioRemedio(token: string, horarioRemedio: {}): Observable<any> {
    return this.http.post<any>(`${this.URL}/CriarHorarioRemedios/${token}`, horarioRemedio);
  }

  atualizarHorarioRemedio(horarioRemedio: {}): Observable<any> {
    return this.http.patch<any>(`${this.URL}/editarHorarioRemedio`, horarioRemedio);
  }

  excluirHorarioRemedio(token: string, id: {}): Observable<any> {
    return this.http.delete(`${this.URL}/deletarHorarioRemedio/${token}`, id)
  }



  buscarHorarioRefeicao(token: string):Observable<any>{
    return  this.http.get<any>(`${this.URL}/refeicoes/${token}`)
  }

  cadastroHorarioRefeicao(token: string, horarioRefeicao: {}): Observable<any> {
    return this.http.post<any>(`${this.URL}/CriarHorarioRefeicoes/${token}`, horarioRefeicao);
  }

  atualizarHorarioRefeicao(horarioRefeicao: {}): Observable<any> {
    return this.http.patch<any>(`${this.URL}/editarHorarioRefeicao`, horarioRefeicao);
  }

  excluirHorarioRefeicao(token: string, id: {}): Observable<any> {
    return this.http.delete(`${this.URL}/deletarHorarioRefeicao/${token}`, id)
  }
}
