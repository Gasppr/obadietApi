import { Injectable } from '@nestjs/common';
import { DoencaEntity } from '../entities/Doenca.entity';
import { RestricaoEntity } from '../entities/Restricao.entity';
import { ReceitaEntity } from '../entities/Receita.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReceitasRepository {
  constructor(
    private sequelize: Sequelize,
    private configService: ConfigService,

    @InjectModel(ReceitaEntity)
    private receitaDB: typeof ReceitaEntity,
  ) {}

  private readonly _receitas: ReceitaEntity[] = [];

  async criarReceita(receita: ReceitaEntity) {
    const resultado = this.receitaDB.create({
      id: receita.id,
      nome: receita.nome,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
    });

    return {
      message: 'Receita cadastrada com sucesso',
      data: resultado,
    };
  }

  async listarReceitas() {
    return this.receitaDB.findAll();
  }

  async procurarReceita(id: number) {
    const Receita: any = this.receitaDB.findOne({
      where: {
        id: id,
      },
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
    const usuario = await this.receitaDB.findOne({
      where: {
        id: id,
      },
    });

    const mensagem = usuario.destroy();

    return mensagem;
  }
}
