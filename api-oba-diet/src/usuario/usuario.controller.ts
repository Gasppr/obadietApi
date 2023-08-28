import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioDto } from './dto/Usuario.DTO';
import { UsuarioEntity } from './entity/UsuarioEntity.entity';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UseGuards } from '@nestjs/common';
// import { RolesGuard } from './guards/usuario.guard';

@Controller('obadiet')
export class UsuarioController {


    constructor(private readonly _usuarioRepository : UsuarioRepository){}

    //@Res() monitora o envio de dados 
    //nome do metodo não importa
    @Post("signup")
    //@UseGuards(new RolesGuard())
    showAllUsers(@Body() userDto : UsuarioDto){

        const userEntity : UsuarioEntity = new UsuarioEntity();

        
        userEntity.nome = userDto.nome
        userEntity.sobrenome = userDto.sobrenome
        userEntity.email = userDto.email
        userEntity.sexo = userDto.sexo
        userEntity.idade = userDto.idade
        userEntity.peso = userDto.peso
        userEntity.altura = userDto.altura
        userEntity.senha = userDto.senha

      return this._usuarioRepository.addUser(userEntity)
    }




    //Autorization or authetication 
    @Get("login")
    signUser(){
       
        return this._usuarioRepository.showAllUsers()

    }


    @Post("sign")
    loginUser(){

        return this._usuarioRepository
    }


    
}
