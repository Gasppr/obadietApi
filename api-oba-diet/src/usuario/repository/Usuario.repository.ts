import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioEntity } from '../entity/UsuarioEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { find } from 'rxjs';

@Injectable()
export class UsuarioRepository {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private sequelize: Sequelize,

    @InjectModel(UsuarioEntity)
    private usuarioBD: typeof UsuarioEntity,
  ) {}

  private _usuario: UsuarioEntity[] = [];

  async encontrarUsuarioId(
    email: String,
    pass: String,
  ): Promise<UsuarioEntity | undefined> {
    const existsUser = this._usuario.find(
      (n) => n.email == email && n.senha == pass,
    );

    return existsUser;
  }

  ProcurarPorID(id: string): Promise<UsuarioEntity> {
    return this.usuarioBD.findOne({
      where: {
        id,
      },
    });
  }

  async ProcurarTodos(): Promise<UsuarioEntity[]> {
    return this.usuarioBD.findAll({
      attributes: ['id', 'nome', 'email', 'peso', 'idade', 'altura', 'sexo'],
    });
  }

  async verificarLogin(email: String, pass: String) {
    const user = await this.usuarioBD.findOne({
      where: {
        email,
        pass,
      },
    });

    if (user?.senha != pass) {
      throw new UnauthorizedException('Este usuário não existe');
    }

    const payload = { id: user.id, pass: user.senha };

    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }

  verificarEmail(email: String) {
    const emailExists = this._usuario.find((n) => n.email == email);

    return emailExists;
  }

  
  async deletarUsuario(idUsuario: string): Promise<Object> {
    const usuario = await this.ProcurarPorID(idUsuario);

    await this.sequelize.transaction(async (transaction) => {

      await usuario.destroy();
    })

    

    return {
      message:
        'Conta excluida com sucesso. Obrigado por confiar em nossos serviços ',
    };
  }

  async criarUsuario(usuario: UsuarioEntity): Promise<Object> {
    try {
      await this.sequelize.transaction(async (transaction) => {
        await this.usuarioBD.create(
          {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            sexo: usuario.sexo,
            idade: usuario.idade,
            peso: usuario.peso,
            altura: usuario.altura,
            senha: usuario.senha,
          },
          { transaction },
        );
      });

      return { message: 'Usuário criado com sucesso!!' };
      
    } catch (err) {
      return err.message;
    }
  }

  async editarUsuario(usuario: UsuarioEntity, id: string) {
    const usuarioNovo = await this.usuarioBD.update(
      {
        nome: usuario.nome,
        idade: usuario.idade,
        altura: usuario.altura,
        peso: usuario.peso,
        senha: usuario.senha,
      },
      {
        where: {
          id: id,
        },
      },
    );

    if(usuarioNovo[0] == 0) {
      return "Modificações já foram feitas"
    }

    return "Perfil modificado com sucesso"
    
    
  }
}
