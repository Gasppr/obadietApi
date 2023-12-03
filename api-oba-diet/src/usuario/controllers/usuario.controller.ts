import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { UsuarioDto } from '../dto/Usuario.dto';
import { UsuarioEntity } from '../entity/UsuarioEntity.entity';
import { UsuarioRepository } from '../repository/Usuario.repository';
import { UseGuards } from '@nestjs/common';
import { UsuarioGuard } from '../../guards/usuario/usuario.guard';
import { LoginDto } from '../dto/Login.dto';
import { IsPublic } from '../../auth/guard/isPublic.decorator';
import { v4 as uuid } from 'uuid';
import { ApiTags } from '@nestjs/swagger';
import { criptografia } from '../criptografia';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Response } from 'express';
import { RemediosHorariosEntity } from '../entity/horarios/RemediosHorario.entity';
import { HorariosRepository } from '../repository/Horarios.repository';
import { UUID } from 'crypto';
import { Horarios_remediosDto } from '../dto/horarios_remedios.dto';
import { RefeicoesHorariosEntity } from '../entity/horarios/RefeicoesHorario.entity';
import { Horarios_RefeicoesDto } from '../dto/horarios_refeicoes.dto ';


// import { RolesGuard } from './guards/usuario.guard';
@ApiTags('Usuarios')
@Controller('obadiet')
export class UsuarioController {
  constructor(
    private readonly _usuarioRepository: UsuarioRepository,
    private cripto: criptografia,
    private mailerService: MailerService,
    private readonly horarios: HorariosRepository,
  ) {}


  @Get('usuario/:id')
  @IsPublic()
  mostrarCredencialUsuario(@Param('id') id : string) {
    return this._usuarioRepository.ProcurarTodos(id);
  }


  @Get('esqueci-senha')
  @Render('esqueciSenha')
  @IsPublic()
  esqueci_senha_get(@Res() res: Response) {
    res.render('esqueciSenha');
  }

  @Get('recuperacao/:token')
  @IsPublic()
  async recuperar_senha_get(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    const usuario = await this._usuarioRepository.ProcurarPorID(token);
    res.render('recuperarSenha', { Email: usuario.email });
  }

  @Post('registrar')
  @IsPublic()
  async createUser(@Body() userDto: UsuarioDto) {
    const userEntity: UsuarioEntity = new UsuarioEntity();

    const senhaCriptografada = await this.cripto.criptografar(userDto.senha);

    userEntity.id = uuid();
    userEntity.nome = userDto.nome;
    userEntity.email = userDto.email;
    userEntity.sexo = userDto.sexo;
    userEntity.idade = userDto.idade;
    userEntity.peso = userDto.peso;
    userEntity.altura = userDto.altura;
    userEntity.senha = senhaCriptografada;

    const mensagem = await this._usuarioRepository.criarUsuario(
      userEntity,
      userDto.doencas,
      userDto.restricao,
    );

    return mensagem;
  }

  @Post('entrar')
  @IsPublic()
  @UseGuards(UsuarioGuard)
  loginUsuario(@Body() loginDto: LoginDto) {
    return this._usuarioRepository.verificarLogin(
      loginDto.email,
      loginDto.senha,
    );

  }

  @Post('esqueci-senha')
  @IsPublic()
  async esqueci_senha_post(
    @Body() { email }: { email: string },
    @Res() res: Response,
  ) {
    const emailVerificado = await this._usuarioRepository.verificarEmail(email);

    if (!emailVerificado) {
      return { mensagem: 'Este email não existe!' };
    }

    // const token =  this.cripto.criptografar(email)

    const token = emailVerificado.id;
    const url = `https://obadietapi.vercel.app/obadiet/recuperacao/${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Resetar sua senha!',
      html: `Click <a href="${url}">Aqui</a> para resetar sua senha`,
    });

    return {
      mensagem: `Verifique seu email: ${email}`,
    };
  }

  @Post('recuperacao/:token')
  @IsPublic()
  async recuperar_senha_post(
    @Param('token') token: string,
    @Body('senha') senhaNova: string,
    @Body('confirmar-senha') confirmar_senha: string,
    @Res() res: Response,
  ) {
    if (senhaNova !== confirmar_senha) {
      throw new BadRequestException('A senha não está certa , tente novamente');
    }

    const usuario = await this._usuarioRepository.ProcurarPorID(token);

    const hash = await this.cripto.criptografar(senhaNova);
    usuario.senha = hash;

    const usuarioComSenhaNova = await this._usuarioRepository.editarUsuario(
      usuario,
      usuario.id,
    );

    res.send(usuarioComSenhaNova);
    return { Mensagem: 'Senha atualizada com sucesso!!' };
  }

  @Patch('EditarPerfil/:id')
  @IsPublic()
  async editarPerfil(@Body() usuarioDto: UsuarioDto, @Param('id') id: string) {
    const usuario: UsuarioEntity = new UsuarioEntity();

    usuario.id = id;
    usuario.nome = usuarioDto.nome;
    usuario.idade = usuarioDto.idade;
    usuario.altura = usuarioDto.altura;
    usuario.peso = usuarioDto.peso;
    usuario.senha = usuarioDto.senha;

    return this._usuarioRepository.editarUsuario(usuario, id);
  }

  @Delete('delete')
  @IsPublic()
  @UseGuards(UsuarioGuard)
  apagarUsuario(@Body() { id }: { id: string }) {
    return this._usuarioRepository.deletarUsuario(id);
  }
}
