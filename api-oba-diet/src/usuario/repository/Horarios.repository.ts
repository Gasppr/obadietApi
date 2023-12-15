import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  RemediosHorariosEntity,
  usuarios_has_horarios_remedios,
} from '../entity/horarios/RemediosHorario.entity';
import {
  RefeicoesHorariosEntity,
  usuarios_has_horarios_refeicoes,
} from '../entity/horarios/RefeicoesHorario.entity';
import { UsuarioEntity } from '../entity/UsuarioEntity.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants';
import { ReceitaEntity, horarios_refeicoes } from '../../receitas/entities/Receita.entity';
import { UsuarioRepository } from './Usuario.repository';

@Injectable()
export class HorariosRepository {
  constructor(
    private jwt: JwtService,

    private usuarioRepository: UsuarioRepository,

    @InjectModel(RemediosHorariosEntity)
    private remediosDB: typeof RemediosHorariosEntity,

    @InjectModel(usuarios_has_horarios_remedios)
    private hasRemedios: typeof usuarios_has_horarios_remedios,

    @InjectModel(usuarios_has_horarios_refeicoes)
    private hasRefeicoes: typeof usuarios_has_horarios_refeicoes,

    @InjectModel(horarios_refeicoes)
    private hasHorariosRefeicoesBD: typeof horarios_refeicoes,

    @InjectModel(RefeicoesHorariosEntity)
    private refeicoesDB: typeof RefeicoesHorariosEntity,

    @InjectModel(UsuarioEntity)
    private usuarioBD: typeof UsuarioEntity,


    @InjectModel(ReceitaEntity)
    private receitaDB: typeof ReceitaEntity,
  ) { }

  async listarReceitas(id: string) {

    const usuario = await this.jwt.verifyAsync(id, {
      secret: jwtConstants.secret,
    });


    const usuarioAchado = await this.usuarioBD.findOne({
      where: {
        email: usuario.email
      }
    })

    const horarios = await this.usuarioBD.findAll({
      include: [
        {
          required: true,
          model: usuarios_has_horarios_refeicoes,
          where: { usuarios_id: usuarioAchado.id },
          include: [{
            model: RefeicoesHorariosEntity, include: [{
              model: horarios_refeicoes, include: [{ model: ReceitaEntity }]
            }]
          }]
        }
      ]
    })



    return horarios;
  }

  async criarHorarioPraRefeicoes(
    horario: RefeicoesHorariosEntity,
    idUsuario: string,
    idReceita: number,
    receitas: number[]
  ) {

    const receitaHorario = await this.refeicoesDB.create({
      horario: horario.horario,
      tipo: horario.tipo,
      data: horario.data,
      repetir: horario.repetir,
      qtdRepeteCada: horario.qtdRepeteCada,
      quandoRepeteCada: horario.quandoRepeteCada,
      diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
      qndTermina: horario.qndTermina,
      qndTerminaData: horario.qndTerminaData,
      qndTerminaHorario: horario.qndTerminaHorario,
      nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
    });

    const horarioAchado = await this.refeicoesDB.findOne({
      where: {
        idHorarios: receitaHorario.idHorarios,
      },
    });

    const emailUsuario = await this.jwt.verifyAsync(idUsuario, {
      secret: jwtConstants.secret,
    });

    const usuario = await this.usuarioBD.findOne({
      where: {
        email: emailUsuario.email,
      },
    });


    await this.hasRefeicoes.create({
      usuarios_id: usuario.id,
      horarios_refeicoes_idhorarios: horarioAchado.idHorarios,
    });

    if (receitas.length > 1) {

      receitas.forEach(async receita => {

        await this.hasHorariosRefeicoesBD.create({
          horarios_refeicoes_idhorarios: horarioAchado.idHorarios,
          receita_id: receita
        })



      })

      return { mensagem: 'Refeições marcadas com sucesso!' };
    } else {

      await this.hasHorariosRefeicoesBD.create({
        horarios_refeicoes_idhorarios: horarioAchado.idHorarios,
        receita_id: idReceita
      })

      return { mensagem: 'Refeições marcadas com sucesso!' };

    }

    return { mensagem: 'Não existe refeições para cadastrar horario :(' }


  }

  async editarHorariosRefeicoes(token: string, horario: RefeicoesHorariosEntity, receitaId: number) {

    const usuario = await this.usuarioRepository.ProcurarTodos(token)

    if (!usuario) return new Error("Token inválido");


    const horarioNovo = await this.refeicoesDB.create(
      {

        horarios: horario.horario,
        tipo: horario.tipo,
        data: horario.data,
        qtdRepeteCada: horario.qtdRepeteCada,
        quandoRepeteCada: horario.quandoRepeteCada,
        diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
        qndTermina: horario.qndTermina,
        qndTerminaData: horario.qndTerminaData,
        qndTerminaHorario: horario.qndTerminaHorario,
        nmrRepeticoesTermino: horario.nmrRepeticoesTermino,

      });

    await this.hasHorariosRefeicoesBD.update({
      horarios_refeicoes_idhorarios: horarioNovo.idHorarios,
      receita_id: receitaId

    },
      {
        where:
        {
          receita_id: receitaId
        },
      }
    )



    await this.hasRefeicoes.create({

      horarios_refeicoes_idhorarios: horarioNovo.idHorarios,
      usuarios_id: usuario.id
    })

    return { mensagem: 'Horario de refeição modificada com sucesso!' };
  }

  async deletarHorariosRefeicoes(token: string, id: number) {

    const usuario = await this.usuarioRepository.ProcurarTodos(token)

    if (!usuario) return new Error("Token inválido");


    await this.hasHorariosRefeicoesBD.destroy({
      where: {
        receita_id: id,
      },
    });

    return { mensagem: 'Horario de remédio excluído com sucesso!' };
  }

  async listarRemedios(id: string) {

    const usuario = await this.jwt.verifyAsync(id, {
      secret: jwtConstants.secret,
    });


    const usuarioAchado = await this.usuarioBD.findOne({
      where: {
        email: usuario.email
      }
    })


    const horarios = await this.remediosDB.findAll({
      include: [
        {

          model: usuarios_has_horarios_remedios,
          where: { usuarios_id: usuarioAchado.id },
          attributes: [],
          include: [{ model: UsuarioEntity, attributes: [] }],
        },
      ],
    });

    return horarios;
  }

  async criarHorarioPraRemedios(
    horario: RemediosHorariosEntity,
    idUsuario: string,
  ) {
    await this.remediosDB.create({
      data: horario.data,
      nomeRemedio: horario.nomeRemedio,
      repetir: horario.repetir,
      horarios: horario.horarios,
      qtdRepeteCada: horario.qtdRepeteCada,
      quandoRepeteCada: horario.quandoRepeteCada,
      diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
      qndTermina: horario.qndTermina,
      qndTerminaData: horario.qndTerminaData,
      qndTerminaHorario: horario.qndTerminaHorario,
      nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
    });

    const horarioAchado = await this.remediosDB.findOne({
      where: {
        data: horario.data,
        nomeRemedio: horario.nomeRemedio,
        repetir: horario.repetir,
        horarios: horario.horarios,
        qtdRepeteCada: horario.qtdRepeteCada,
        quandoRepeteCada: horario.quandoRepeteCada,
        diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
        qndTermina: horario.qndTermina,
        qndTerminaData: horario.qndTerminaData,
        qndTerminaHorario: horario.qndTerminaHorario,
        nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
      },
    });

    const emailUsuario = await this.jwt.verifyAsync(idUsuario, {
      secret: jwtConstants.secret,
    });

    const usuario = await this.usuarioBD.findOne({
      where: {
        email: emailUsuario.email,
      },
    });

    await this.hasRemedios.create({
      usuarios_id: usuario.id,
      horarios_remedios_idHorario: horarioAchado.idHorario,
    });

    return { mensagem: 'Remédio marcado com sucesso!' };
  }

  async editarHorariosRemedios(token: string, horario: RemediosHorariosEntity) {

    const usuario = await this.usuarioRepository.ProcurarTodos(token)

    if (!usuario) return new Error("Token inválido");

    await this.remediosDB.update(
      {
        data: horario.data,
        nomeRemedio: horario.nomeRemedio,
        repetir: horario.repetir,
        horarios: horario.horarios,
        qtdRepeteCada: horario.qtdRepeteCada,
        quandoRepeteCada: horario.quandoRepeteCada,
        diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
        qndTermina: horario.qndTermina,
        qndTerminaData: horario.qndTerminaData,
        qndTerminaHorario: horario.qndTerminaHorario,
        nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
      },
      {
        where: {
          idHorario: horario.idHorario,
        },
      },
    );

    return { mensagem: 'Horario de remédio modificado com sucesso!' };
  }

  async deletarHorariosRemedios(token: string, id: number) {


    const usuario = await this.usuarioRepository.ProcurarTodos(token)

    if (!usuario) return new Error("Token inválido");


    await this.hasRemedios.destroy({
      where: {
        horarios_remedios_idHorario: id,
      },
    });

    await this.remediosDB.destroy({
      where: {
        idHorario: id,
      },
    });

    return { mensagem: 'Horario de remédio excluído com sucesso!' };
  }



}
