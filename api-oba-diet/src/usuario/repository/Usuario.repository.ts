import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  UsuarioEntity,
  Usuario_Has_Doencas,
  Usuario_Has_Receitas,
  Usuario_Has_Restricoes,
} from '../entity/UsuarioEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RestricaoEntity } from '../../receitas/entities/Restricao.entity';
import { DoencaEntity } from '../../receitas/entities/Doenca.entity';
import { ReceitaEntity } from '../../receitas/entities/Receita.entity';
import { jwtConstants } from '../../auth/constants';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class UsuarioRepository {
  async deletarReceitaSalva(usuarios_id: string, receita_id: number) {
    const  receita = await this.usuarioHasReceitaBD.destroy({
      where :{
        usuarios_id : usuarios_id,  
        receita_id : receita_id
      }
    })

    return {mensagem : `Receita ${receita_id} excluída dos favoritos com sucesso!`}
  }


  constructor(
    private jwtService: JwtService,

    private loginService: AuthService,

    @InjectModel(UsuarioEntity)
    private usuarioBD: typeof UsuarioEntity,

    @InjectModel(Usuario_Has_Restricoes)
    private usuarioHasRestricaoBD: typeof Usuario_Has_Restricoes,

    @InjectModel(Usuario_Has_Doencas)
    private usuarioHasDoencaBD: typeof Usuario_Has_Doencas,

    @InjectModel(Usuario_Has_Receitas)
    private usuarioHasReceitaBD : typeof Usuario_Has_Receitas
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

  async ProcurarTodos(id: string): Promise<UsuarioEntity> {
    const usuario = await this.jwtService.verifyAsync(id, {
      secret: jwtConstants.secret,
    });

    const usuarioAchado = await this.usuarioBD.findOne({
      attributes: ['id', 'nome', 'email', 'peso', 'idade', 'altura', 'sexo'],
      include: [
        {
          model: Usuario_Has_Restricoes,
          attributes: ['restricoes_idRestricao'],
          include: [{ model: RestricaoEntity, attributes: ['nomeRestricao'] }],
        },
        {
          model: Usuario_Has_Doencas,
          attributes: ['doencas_idDoenca'],
          include: [{ model: DoencaEntity, attributes: ['nomeDoenca'] }],
        },
        {
          required: false,
          model: Usuario_Has_Receitas,
          attributes: ['receita_id'],
          include: [{ model: ReceitaEntity }],
        },
      ],
      where: {
        email: usuario.email,
      },
    });
    return usuarioAchado;
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

  async verificarEmail(emailUser: string) {
    const emailExists = await this.usuarioBD.findOne({
      where: {
        email: emailUser,
      },
    });

    return emailExists;
  }

  async deletarUsuario(idUsuario: string) {
    await this.usuarioHasRestricaoBD.destroy({
      where: { usuarios_id: idUsuario },
    });
    await this.usuarioHasDoencaBD.destroy({
      where: { usuarios_id: idUsuario },
    });

    const usuario = await this.ProcurarPorID(idUsuario);
    const usuarioExcluido = await usuario.destroy();

    return {
      message:
        'Conta excluida com sucesso. Obrigado por confiar em nossos serviços ',
    };
  }

  async criarUsuario(
    usuario: UsuarioEntity,
    doencas: number[],
    restricoes: number[],
  ) {
    const emailExiste = await this.verificarEmail(usuario.email);

    if (emailExiste) {
      return {
        mensagem: 'Já existe uma conta com esse email! tente com outro',
      };
    }

    const usuarioNovo = await this.usuarioBD.create({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      sexo: usuario.sexo,
      idade: usuario.idade,
      peso: usuario.peso,
      altura: usuario.altura,
      senha: usuario.senha,
    });

    await doencas.forEach((e) => {
      let doenca = {
        usuarios_id: usuarioNovo.id,
        doencas_idDoenca: e,
      };
      this.usuarioHasDoencaBD.create(doenca);
    });

    await restricoes.forEach((e) => {
      let restricao = {
        usuarios_id: usuarioNovo.id,
        restricoes_idRestricao: e,
      };
      this.usuarioHasRestricaoBD.create(restricao);
    });


  


    return {
      mensagem: `Seja bem-vindo ao ObaDiet ${usuarioNovo.nome}!`,
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
      return 'Modificações já foram feitas';
    }

    return 'Perfil modificado com sucesso';
  }


  async salvarReceita(usuario : string , receita : number) {

    const salvo = await this.usuarioHasReceitaBD.create({
      usuarios_id : usuario,
      receita_id : receita
    })

    return { mensagem: "Receita cadastrada com sucesso",
            receita : salvo?.receita_id}


  }


}
