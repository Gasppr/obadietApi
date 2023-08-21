import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';

@Controller('user')
export class UsuarioController {



    //@Res() monitora o envio de dados 
    @Post("register")
    //nome do metodo não importa
    showAllUsers(): string{
        return "metodo funcionando"
    }




    
}
