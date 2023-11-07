import { Injectable } from '@nestjs/common';
import { DoencaEntity } from '../entities/Doenca.entity';
import { RestricaoEntity } from '../entities/Restricao.entity';
import {
  ReceitaEntity,
  Receita_has_doencas,
  Receita_has_restricoes,
} from '../entities/Receita.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { DoencaDto } from '../dto/Doenca.dto';
import { RestricaoDto } from '../dto/Restricao.dto';
import { CategoriaEntity } from '../entities/Categoria.entity';

@Injectable()
export class ReceitasRepository {
  constructor(
    private sequelize: Sequelize,
    private configService: ConfigService,

    @InjectModel(ReceitaEntity)
    private receitaDB: typeof ReceitaEntity,

    @InjectModel(Receita_has_doencas)
    private constraintDoencas: typeof Receita_has_doencas,

    @InjectModel(Receita_has_restricoes)
    private constraintRestricoes: typeof Receita_has_restricoes,

    @InjectModel(DoencaEntity)
    private doencaDB: typeof DoencaEntity,

    @InjectModel(RestricaoEntity)
    private restricaoDB: typeof RestricaoEntity,
  ) { }

  async criarReceita(receita: ReceitaEntity, doencas: DoencaDto[], restricoes: RestricaoDto[], categorias: CategoriaEntity[]) {

    await this.receitaDB.create({
      id: receita.id,
      nome: receita.nome,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
    });

    const id = await this.receitaDB.findOne({ where: { nome: receita.nome } })

    for (let i = 0; i < restricoes.length; i++) {
      await this.constraintRestricoes.create({
        receita_id: id.id,
        restricoes_idRestricao: restricoes[i].idRestricao,
      });
    }
    for (let i = 0; i < doencas.length; i++) {
      await this.constraintDoencas.create({
        receita_id: id.id,
        doencas_idDoenca: doencas[i].idDoenca
      });
    }

    const resultado = await this.receitaDB.findOne({
      where: {
        nome: receita.nome
      }
    })

    return {
      message: 'Receita cadastrada com sucesso',
      data: resultado,
    };
  }

  async listarReceitas() {
    const receita = await this.receitaDB.findAll({
      include: [
        {
          required: false,
          model: RestricaoEntity,
          

        },
        {
          required: false,
          model: DoencaEntity,
          

        },
        {
          required: false,
          model: CategoriaEntity,

        }
      ],
    });

    return receita;
  }

  async procurarReceita(id: number) {
    const Receita: any = this.receitaDB.findOne({
      where: {
        id: id,
      },
      include: [{ required: false, model: DoencaEntity }, { model: RestricaoEntity, required: false }, { model: CategoriaEntity, required: false }],
    });

    return Receita;
  }

  async editarReceita(id: number, receita: ReceitaEntity) {
    const receitaEditada = this.receitaDB.update(
      {
        nome: receita.nome,
        ingredientes: receita.ingredientes,
        modoPreparo: receita.modoPreparo,
      },
      {
        where: {
          id: id,
        },
      },
    );

    return {
      message: 'Receita atualizada com sucesso',
      data: receitaEditada,
    };
  }

  async deletarReceita(id: number) {
    let receitaDoencas: Receita_has_doencas[] =
      await this.constraintDoencas.findAll({ where: { receita_id: id } });

    let receitaRestrioes: Receita_has_restricoes[] =
      await this.constraintRestricoes.findAll({ where: { receita_id: id } });

    receitaDoencas.forEach((n) => n.destroy());
    receitaRestrioes.forEach((n) => n.destroy());

    const receita = await this.receitaDB.findOne({
      where: {
        id,
      },
    });

    const resultado = await receita.destroy();
    return {
      mensagem: 'Exclusão da receita foi realizada com sucesso!',
      receita: resultado,
    };
  }


  buscarDoencas() {
    const doencas = this.doencaDB.findAll()

    return doencas
  }

  buscarRestricoes() {
    const restricoes = this.restricaoDB.findAll()

    return restricoes
  }
}
