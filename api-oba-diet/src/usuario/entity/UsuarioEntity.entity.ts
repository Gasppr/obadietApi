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
} from 'sequelize-typescript';
import { DoencaEntity } from 'src/receitas/entities/Doenca.entity';
import { ReceitaEntity } from 'src/receitas/entities/Receita.entity';
import { RestricaoEntity } from 'src/receitas/entities/Restricao.entity';

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
  nome: String;

  @Column
  email: String;

  @Column
  sexo: sexoEnum;

  @Column
  idade: number;

  @Column
  peso: number;

  @Column
  altura: number;

  @Column
  senha: String;

  @BelongsToMany(()=> RestricaoEntity , ()=> Usuario_Has_Restricoes)
  restricoes : RestricaoEntity[]

  @BelongsToMany(() => DoencaEntity , ()=> Usuario_Has_Doencas)
  doencas: DoencaEntity[]

  @HasMany(() => ReceitaEntity, { onDelete: 'cascade' })
  receitas: ReceitaEntity[]
}

@Table({modelName:'usuarios_has_restricoes', createdAt:false, deletedAt:false})
export class Usuario_Has_Restricoes extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> RestricaoEntity)
  @Column
  restricoes_idRestricoes:number

}

@Table({modelName:'usuarios_has_doencas', createdAt:false, deletedAt:false})
export class Usuario_Has_Doencas extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> DoencaEntity)
  @Column
  doencas_idDoenca:number

}