import {
  Model,
  Column,
  Table,
  IsUUID,
  PrimaryKey,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
  IsNull,
} from 'sequelize-typescript';
import { DoencaEntity } from '../../receitas/entities/Doenca.entity';
import { ReceitaEntity } from '../../receitas/entities/Receita.entity';
import { RestricaoEntity } from '../../receitas/entities/Restricao.entity';
import { IncludeThroughOptions } from 'sequelize';
import { usuarios_has_horarios_refeicoes } from './horarios/RefeicoesHorario.entity';
import { usuarios_has_horarios_remedios } from './horarios/RemediosHorario.entity';

export enum sexoEnum {
  'MASCULINO' = 'Masculino',
  'FEMININO' = 'Feminino',
}

@Table({ tableName: 'usuarios', deletedAt: false, createdAt: false })
export class UsuarioEntity extends Model {
  
  @IsUUID('all')
  @PrimaryKey
  @ForeignKey(() => ReceitaEntity)
  @Column
  id: string;

  @Column
  nome: string;

  @Column
  email: string;

  @Column
  sexo: sexoEnum;

  @Column
  idade: number;

  @Column
  peso: number;

  @Column
  altura: number;

  @Column
  senha: string;

  @HasMany(()=> Usuario_Has_Restricoes)
  restricoes : Usuario_Has_Restricoes[]

  @HasMany( ()=> Usuario_Has_Doencas)  
  doencas : Usuario_Has_Doencas[]

  @HasMany(()=> Usuario_Has_Receitas)
  receitasSalvas : Usuario_Has_Receitas[]
  
  @HasMany(()=> usuarios_has_horarios_refeicoes)
  horarios_refeicoes : usuarios_has_horarios_refeicoes[]

  @HasMany(()=> usuarios_has_horarios_remedios)
  horarios_remedios : usuarios_has_horarios_remedios[]

  
}

@Table({modelName : 'usuarios_has_receita' , createdAt:false, deletedAt: false})
export class Usuario_Has_Receitas extends Model{

  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  usuarios_id : number

  @ForeignKey(() => ReceitaEntity)
  @PrimaryKey
  @Column
  receita_id : number


  @BelongsTo(()=> UsuarioEntity)
  usuarios: UsuarioEntity[]

  @BelongsTo(()=> ReceitaEntity)
  restricoes: ReceitaEntity[]
}

@Table({modelName:'usuarios_has_restricoes', createdAt:false, deletedAt:false})
export class Usuario_Has_Restricoes extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  usuarios_id : number

  @ForeignKey(()=> RestricaoEntity)
  @PrimaryKey
  @Column
  restricoes_idRestricao:number

  @BelongsTo(()=> UsuarioEntity)
  usuarios: UsuarioEntity[]

  @BelongsTo(()=> RestricaoEntity)
  restricoes: RestricaoEntity[]


}

@Table({modelName:'usuarios_has_doencas', createdAt:false, deletedAt:false})
export class Usuario_Has_Doencas extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  usuarios_id : number

  @ForeignKey(()=> DoencaEntity)
  @PrimaryKey
  @Column
  doencas_idDoenca:number

  @BelongsTo(()=> UsuarioEntity)
  usuarios: UsuarioEntity[]

  @BelongsTo(()=> DoencaEntity)
  doencas: DoencaEntity[]



}