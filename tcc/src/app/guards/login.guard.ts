import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, mergeMap } from 'rxjs';
import { LoginService } from '../services/Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard{
  constructor(
    private loginService : LoginService,
    private router: Router,

  ){}

  canActivate(): Observable<boolean>{

    return from(this.loginService.autenticacaoUsuario()).pipe(mergeMap(autenticacao => {
      
      return new Observable<boolean>(observe=>{
          if(autenticacao){
            this.router.navigateByUrl('/obaDiet/home')
          }
          observe.next(!autenticacao)
      })
    }))
  }

  
}
