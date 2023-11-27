import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  constructor(private login : LoginService) { }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  } 

  ngOnInit() {
  }


  async logout(){
    this.login.sairDaConta()
    
  } 
  

}
