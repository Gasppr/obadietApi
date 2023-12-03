import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url_api = 'https://obadietapi.vercel.app/obadiet/'

  private sessao = new BehaviorSubject<Boolean | null>(null);


  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {

    this.carregarToken()

  }


  async credenciaisUsuario(token: string) {
    const user = await this.http.get(`${this.url_api}usuario/${token}`)

    return user

  }

  async autenticacaoUsuario() {
    const token = await this.storageService.buscarToken("token")

    if (!token) return false


    const estadoExpirado = this.tokenExpirado(token)

    if (estadoExpirado == false) {
      return false
    } else {
      return true
    }
  }

  private tokenExpirado(token: any) {

    const tokenDecodificado = jwtDecode(token)

    let expirado = tokenDecodificado["exp"]

    if (expirado) {
      const estadoExpirado = (Math.floor((new Date).getTime() / 1000)) >= expirado;

      return estadoExpirado;
    }


    return false

  }

  async carregarToken() {
    const token = await this.storageService.buscarToken("token")

    if (token) {
      this.sessao.next(true);
    } else {
      this.sessao.next(false)
    }
  }
  private token?: string

  async login(usuario: Login) {

    if (!usuario.email && !usuario.senha) return;

    let erro : any

    await this.fazerLogin(usuario).subscribe({
      next: async (data: any) => {

        this.token = data.acess_token

        if (this.token) {

          await this.storageService.guardarToken("token", this.token);
          await this.sessao.next(true)
          await this.router.navigateByUrl('obaDiet/home', { replaceUrl: true })

          return true;
        }
        else {
          return "Credenciais inválidas"
        }
      },
      error: (err) => {
        erro = err
      }
    })



  }


  fazerLogin(usuario: Login) {
    return this.http.post(`${this.url_api}auth/entrar`, usuario)
  }


  async sairDaConta() {
    this.sessao.next(false);
    await this.storageService.removerToken("token")
    localStorage.clear()
    localStorage.clear()
    location.reload()
  }

  async checarValidacao() {
    const token = await this.storageService.buscarToken("token")
    if (!token) return false

    let estadoExpirado = this.tokenExpirado(token)

    if (estadoExpirado) return false

    let estadoValido = await this.validarToken(token)

    if (!estadoValido) return false
    else return true
  }


  async validarToken(token: any) {

    return this.http.get(`${this.url_api}auth/perfil`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    })

  }

}