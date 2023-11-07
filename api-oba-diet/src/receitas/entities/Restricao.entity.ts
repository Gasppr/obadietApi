import { Column, PrimaryKey, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";

@Table({modelName: 'restricoes', deletedAt:false, createdAt:false})
export class RestricaoEntity extends Model {


  @PrimaryKey
  @Column
  idRestricao: number;
  @Column
  nomeRestricao: string;

  @BelongsTo(()=> ReceitaEntity , 'idRestricao')
  receitas : ReceitaEntity[]
}


