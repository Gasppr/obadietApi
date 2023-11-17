import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from '../entity/UsuarioEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { find } from 'rxjs';
import { RestricaoEntity } from '../../receitas/entities/Restricao.entity';
import { DoencaEntity } from '../../receitas/entities/Doenca.entity';
import { ReceitaEntity } from '../../receitas/entities/Receita.entity';

@Injectable()
export class UsuarioRepository {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private sequelize: Sequelize,

    @InjectModel(UsuarioEntity)
    private usuarioBD: typeof UsuarioEntity,

    @InjectModel(Usuario_Has_Restricoes)
    private usuarioHasRestricaoBD: typeof Usuario_Has_Restricoes,

    @InjectModel(Usuario_Has_Doencas)
    private usuarioHasDoencaBD: typeof Usuario_Has_Doencas,

  ) { }

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
      include: [
        { required: false, model: RestricaoEntity },
        { required: false, model: DoencaEntity },
      ]
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


  async deletarUsuario(idUsuario: string){

    await this.usuarioHasRestricaoBD.destroy({where:{usuarios_id: idUsuario}})
    await this.usuarioHasDoencaBD.destroy({where:{usuarios_id: idUsuario}})


    const usuario = await this.ProcurarPorID(idUsuario);  
    const usuarioExcluido = await usuario.destroy()


    return {
      message:
        'Conta excluida com sucesso. Obrigado por confiar em nossos serviços ',
    };
  }

  async criarUsuario(usuario: UsuarioEntity, doencas: number[], restricoes:number[]){

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
      }
    );

   const usuarioNovo = await this.usuarioBD.findOne({where: {nome : usuario.nome}})

   for (let i = 0; i < restricoes.length; i++) {
    await this.usuarioHasRestricaoBD.create({
      usuarios_id : usuarioNovo.id,
      restricoes_idRestricao: restricoes[i],
    });
  }
   for (let i = 0; i < doencas.length; i++) {
    await this.usuarioHasDoencaBD.create({
      usuarios_id : usuarioNovo.id,
      doencas_idDoenca: doencas[i]
    });
  }



     return await{ mensagem: `Seja bem-vindo ao ObaDiet ${usuarioNovo.nome}!`,
     };


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

    if (usuarioNovo[0] == 0) {
      return "Modificações já foram feitas"
    }

    return "Perfil modificado com sucesso"


  }
}
