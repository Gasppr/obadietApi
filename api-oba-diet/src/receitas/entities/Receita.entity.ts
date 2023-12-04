import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  addOptions,
} from 'sequelize-typescript';
import { DoencaEntity } from './Doenca.entity';
import { RestricaoEntity } from './Restricao.entity';
import { UsuarioEntity, Usuario_Has_Receitas } from '../../usuario/entity/UsuarioEntity.entity';
import { Options } from '@nestjs/common';
import { CategoriaEntity } from './Categoria.entity';
import { usuarios_has_horarios_refeicoes } from '../../usuario/entity/horarios/RefeicoesHorario.entity';

@Table({ tableName: 'receita'})
export  class ReceitaEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @ForeignKey(() => UsuarioEntity , )
  @Column
  id: number;

  @Column
  nome: string;

  @Column
  ingredientes: string;

  @Column
  modoPreparo: string;

  @Column 
  categoria : number

  @Column
  imagem : string

  @HasMany(()=> Usuario_Has_Receitas)
  usuario : Usuario_Has_Receitas[]

  @HasMany(()=> Receita_has_doencas)
  doencas : Receita_has_doencas[]

  @HasMany(()=> Receita_has_restricoes)
  restricoes : Receita_has_restricoes[]

  @HasMany(()=> Receita_has_categoria)
  categorias : Receita_has_categoria[]

  @HasMany(()=> usuarios_has_horarios_refeicoes )
  horarisoRefeicoes : usuarios_has_horarios_refeicoes[]

  @BelongsTo(()=> UsuarioEntity , 'id')
  usuarios : UsuarioEntity[]


}

@Table({ modelName: 'receita_has_doencas', deletedAt: 'cascade', createdAt: false })
export class Receita_has_doencas extends Model {
  
  @ForeignKey(()=> ReceitaEntity)
  @PrimaryKey
  @Column
  receita_id: number;

  @ForeignKey(()=> DoencaEntity)
  @PrimaryKey
  @Column
  doencas_idDoenca: number;

  @BelongsTo(()=> ReceitaEntity)
  receitas : ReceitaEntity[]
 
  @BelongsTo(()=> DoencaEntity)
  doencas : DoencaEntity[]





}

@Table({ modelName: 'receita_has_restricoes' })
export class Receita_has_restricoes extends Model {
  

  
  @ForeignKey(()=> ReceitaEntity)
  @PrimaryKey
  @Column
  receita_id: number;

  @ForeignKey(()=> RestricaoEntity)
  @PrimaryKey
  @Column
  restricoes_idRestricao: number

  @BelongsTo(()=> ReceitaEntity)
  receitas : ReceitaEntity[]
 
  @BelongsTo(()=> RestricaoEntity)
  restricoes : RestricaoEntity[]



}

@Table({ modelName: 'receita_has_categoria' })
export class Receita_has_categoria extends Model {
  

  
  @ForeignKey(()=> ReceitaEntity)
  @PrimaryKey
  @Column
  receita_id: number;

  @ForeignKey(()=> CategoriaEntity)
  @PrimaryKey
  @Column
  categoria_idCategoria: number

  @BelongsTo(()=> ReceitaEntity)
  receitas : ReceitaEntity[]
 
  @BelongsTo(()=> CategoriaEntity)
  categorias : CategoriaEntity[]



}

