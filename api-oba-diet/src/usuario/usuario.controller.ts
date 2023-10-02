import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioDto } from './dto/Usuario.DTO';
import { UsuarioEntity } from './entity/UsuarioEntity.entity';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UseGuards } from '@nestjs/common';
import { UsuarioGuard } from 'src/guards/usuario/usuario.guard';
import {LoginDto} from './dto/Login.DTO'
import { IsPublic } from 'src/auth/guard/isPublic.decorator';

// import { RolesGuard } from './guards/usuario.guard';

@Controller('obadiet')
export class UsuarioController {


    constructor(private readonly _usuarioRepository : UsuarioRepository){}

    //@Res() monitora o envio de dados 
    //nome do metodo não importa
    @Post("register")
    @IsPublic()
    @UseGuards(UsuarioGuard)
    createUser(@Body() userDto : UsuarioDto){

        const userEntity : UsuarioEntity = new UsuarioEntity();

        
        userEntity.nome = userDto.nome
        userEntity.email = userDto.email
        userEntity.sexo = userDto.sexo
        userEntity.idade = userDto.idade
        userEntity.peso = userDto.peso
        userEntity.altura = userDto.altura
        userEntity.senha = userDto.senha

      return this._usuarioRepository.AdicionarUsuario(userEntity)
    }

    
    @Get("showAllUsers")
    @IsPublic()
    showAllUsers(){
       
        return this._usuarioRepository.mostrarTodosUsuarios()

    }


    @Post("sign")
    @IsPublic()
    @UseGuards(UsuarioGuard)
    loginUser(@Body() loginDto : LoginDto){


      return  this._usuarioRepository.verificarLogin(loginDto.email, loginDto.senha)

    }


    
}
