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
import { UsuarioEntity } from '../../usuario/entity/UsuarioEntity.entity';
import { Options } from '@nestjs/common';
import { CategoriaEntity } from './Categoria.entity';

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

  @HasMany(()=> DoencaEntity, 'idDoenca' )
  doencas : DoencaEntity[]

  @HasMany(()=> RestricaoEntity, 'idRestricao' )
  restricoes : RestricaoEntity[]

  @HasMany(()=> CategoriaEntity, 'idCategoria' )
  categorias : CategoriaEntity[]

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
  restricoes_idRestricao: number;


}

