import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsuarioDto } from './dto/Usuario.dto';
import { UsuarioEntity } from './entity/UsuarioEntity.entity';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UseGuards } from '@nestjs/common';
import { UsuarioGuard } from 'src/guards/usuario/usuario.guard';
import { LoginDto } from './dto/Login.dto';
import { IsPublic } from 'src/auth/guard/isPublic.decorator';
import { v4 as uuid} from 'uuid';
import {ApiBody, ApiTags} from '@nestjs/swagger'




// import { RolesGuard } from './guards/usuario.guard';
@ApiTags('Usuarios')
@Controller('obadiet')
export class UsuarioController {
  constructor(private readonly _usuarioRepository: UsuarioRepository) {}

  @Get('usuarios')
  @IsPublic()
  showAllUsers() {
    return this._usuarioRepository.ProcurarTodos();
  }

  @Post('registrar')
  @IsPublic()
  createUser(@Body() userDto: UsuarioDto) {
    const userEntity: UsuarioEntity = new UsuarioEntity();

    userEntity.id = uuid()
    userEntity.nome = userDto.nome;
    userEntity.email = userDto.email;
    userEntity.sexo = userDto.sexo;
    userEntity.idade = userDto.idade;
    userEntity.peso = userDto.peso;
    userEntity.altura = userDto.altura;
    userEntity.senha = userDto.senha;

    this._usuarioRepository.criarUsuario(userEntity)
    
  }

  @Post('entrar')
  @IsPublic()
  @UseGuards(UsuarioGuard)
  loginUs(@Body() loginDto: LoginDto) {
    return this._usuarioRepository.verificarLogin(
      loginDto.email,
      loginDto.senha,
    );
  }

  @Patch('EditarPerfil/:id')
  @IsPublic()
  async editarPerfil(@Body()  usuarioDto: UsuarioDto, @Param('id') id : string ){

    const usuario : UsuarioEntity = new UsuarioEntity()

    usuario.id = id
    usuario.nome = usuarioDto.nome
    usuario.idade = usuarioDto.idade
    usuario.altura = usuarioDto.altura
    usuario.peso = usuarioDto.peso
    usuario.senha = usuarioDto.senha

   return  this._usuarioRepository.editarUsuario(usuario, id)

  }

  @Delete('delete')
  @IsPublic()
  @UseGuards(UsuarioGuard)
  apagarUsuario(@Body() { id }: { id: string }) {
    return this._usuarioRepository.deletarUsuario(id);
  }

 



}
