import { Component, OnInit } from '@angular/core';
import { EsqueciSenhaService } from '../services/esqueci-senha.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.page.html',
  styleUrls: ['./recuperacao.page.scss'],
})
export class RecuperacaoPage {

  public email: string
  constructor(private esqueciSenha: EsqueciSenhaService) {
    this.email = ''
  }


  async mandarEmail() {
    if (!this.email) return

    const mensagem = await this.esqueciSenha.mandarEmailDeRecuperacao(this.email).subscribe({
      next: (data: any) => {
        console.log(data)

      }
    })



  }


}
