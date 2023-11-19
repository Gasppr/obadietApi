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

  @BelongsToMany(()=> RestricaoEntity, ()=> Usuario_Has_Restricoes)
  restricoes : RestricaoEntity[]

  @BelongsToMany(()=> DoencaEntity , ()=> Usuario_Has_Doencas)  
  doencas : DoencaEntity[]
  userEntity: Promise<string>;


  
}

@Table({modelName:'usuarios_has_restricoes', createdAt:false, deletedAt:false})
export class Usuario_Has_Restricoes extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> RestricaoEntity)
  @Column
  restricoes_idRestricao:number

  @BelongsTo(()=> UsuarioEntity)
  usuarios: UsuarioEntity[]


}

@Table({modelName:'usuarios_has_doencas', createdAt:false, deletedAt:false})
export class Usuario_Has_Doencas extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> DoencaEntity)
  @Column
  doencas_idDoenca:number

  @BelongsTo(()=> UsuarioEntity)
  usuarios: UsuarioEntity[]



}