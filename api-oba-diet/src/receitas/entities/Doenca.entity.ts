import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";

@Table({modelName:'doencas' })
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;

  @BelongsTo(()=> ReceitaEntity , 'idDoenca')
  receitas : ReceitaEntity[]
  
}
