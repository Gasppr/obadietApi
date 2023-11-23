import { Injectable } from '@nestjs/common';
import { DoencaEntity } from '../entities/Doenca.entity';
import { RestricaoEntity } from '../entities/Restricao.entity';
import {
  ReceitaEntity,
  Receita_has_categoria,
  Receita_has_doencas,
  Receita_has_restricoes,
} from '../entities/Receita.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { DoencaDto } from '../dto/Doenca.dto';
import { RestricaoDto } from '../dto/Restricao.dto';
import { CategoriaEntity } from '../entities/Categoria.entity';
import { Op } from 'sequelize';

@Injectable()
export class ReceitasRepository {
  constructor(
    private sequelize: Sequelize,
    private configService: ConfigService,

    @InjectModel(ReceitaEntity)
    private receitaDB: typeof ReceitaEntity,

    @InjectModel(RestricaoEntity)
    private restricaoDB: typeof RestricaoEntity,

    @InjectModel(DoencaEntity)
    private doencaDB: typeof DoencaEntity,

    @InjectModel(Receita_has_doencas)
    private constraintDoencas: typeof Receita_has_doencas,

    @InjectModel(Receita_has_restricoes)
    private constraintRestricoes: typeof Receita_has_restricoes,

    @InjectModel(Receita_has_categoria)
    private constraintCategoria: typeof Receita_has_categoria

  
  ) { }

  async criarReceita(receita: ReceitaEntity, doencas: number[], restricoes: number[], categorias: number[]) {

    await this.receitaDB.create({
      id: receita.id,
      nome: receita.nome,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
      imagem : receita.imagem
    });

    const receitaNova = await this.receitaDB.findOne({ where: { nome: receita.nome } })

    for (let i = 0; i < restricoes.length; i++) {
      await this.constraintRestricoes.create({
        receita_id: receitaNova.id,
        restricoes_idRestricao: restricoes[i],
      });
    }
    for (let i = 0; i < doencas.length; i++) {
      await this.constraintDoencas.create({
        receita_id: receitaNova.id,
        doencas_idDoenca: doencas[i]
      });
    }

    for (let i = 0; i < categorias.length; i++) {
      await this.constraintCategoria.create({
        receita_id: receitaNova.id,
        categoria_idCategoria: categorias[i]
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
         
          model: Receita_has_restricoes,
          required: true,
          include: [RestricaoEntity],
        },
        {
         
          model: Receita_has_doencas,
          required: true,
          include: [DoencaEntity],
        },
        {
          
          required: true,
          
          model: Receita_has_categoria,
         
          include: [CategoriaEntity],
        }
      ],
    });

    return receita;
  }

  async procurarReceita(id: number) {
    const Receita: any = this.receitaDB.findOne({
      where: {
       id : id
      },
      include: [
        {
         
          model: Receita_has_restricoes,
          required: true,
          include: [RestricaoEntity],
        },
        {
         
          model: Receita_has_doencas,
          required: true,
          include: [DoencaEntity],
        },
        {
          
          required: true,
          
          model: Receita_has_categoria,
         
          include: [CategoriaEntity],
        }
      ],
    });

    return Receita;
  }

  async procurarReceitaPorNome(nome: string) {
    const Receita: any = this.receitaDB.findOne({
      where: {
        nome: {[Op.like] : `%${nome}%`}
      },
      include: [
        {
         
          model: Receita_has_restricoes,
          required: true,
          include: [RestricaoEntity],
        },
        {
         
          model: Receita_has_doencas,
          required: true,
          include: [DoencaEntity],
        },
        {
          
          required: true,
          
          model: Receita_has_categoria,
         
          include: [CategoriaEntity],
        }
      ],
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

  async deletarReceita(idReceita: number) {
   
    await this.constraintRestricoes.destroy({where:{receita_id : idReceita}})
    
    await this.constraintDoencas.destroy({where:{receita_id : idReceita}})

    await this.constraintCategoria.destroy({where:{receita_id : idReceita}})

    const resultado = await this.receitaDB.destroy({where:{id : idReceita}});

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
