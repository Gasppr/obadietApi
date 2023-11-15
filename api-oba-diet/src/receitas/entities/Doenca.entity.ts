import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";
import { UsuarioEntity } from "../../usuario/entity/UsuarioEntity.entity";

@Table({modelName:'doencas' })
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;

  @BelongsTo(()=> ReceitaEntity , 'idDoenca')
  receitas : ReceitaEntity[]
  
  @BelongsTo(()=> UsuarioEntity , 'idDoenca')
  usuarios : UsuarioEntity[]
}
