import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, from, mergeMap } from 'rxjs';
import { LoginService } from '../services/Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    private loginService : LoginService,
    private router: Router,

  ){}

  canActivate(): Observable<boolean>{

    return from(this.loginService.checarValidacao()).pipe(mergeMap(autenticacao =>{
      return new Observable<boolean>(observe =>{
        if(!autenticacao) this.router.navigateByUrl('/iniciov2');

        observe.next(autenticacao)
      })
    }))
  }
  

  
  
}
