import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/Login/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario?: any;
  constructor(
    private loginService: LoginService,
    private localStorage: Storage
  ) {
    this.carregarDados();
  }

  ngOnInit() {}

  async carregarDados() {
    const token = await this.localStorage.get('token');

    await (
      await this.loginService.credenciaisUsuario(token)
    ).subscribe({
      next: (data: any) => {
        this.usuario = data;
      },
    });
  }
}
