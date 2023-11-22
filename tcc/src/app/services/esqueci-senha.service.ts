import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaService {

  private readonly URL = "https://obadietapi.vercel.app/obadiet/";

  constructor(private http : HttpClient) { }


  mandarEmailDeRecuperacao(email : string){
      return this.http.post(`${this.URL}esqueci-senha` , {email: email})
  }

}
