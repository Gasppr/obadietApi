import { Column, PrimaryKey, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";
import { UsuarioEntity } from "../../usuario/entity/UsuarioEntity.entity";

@Table({modelName: 'restricoes', deletedAt:false, createdAt:false})
export class RestricaoEntity extends Model {


  @PrimaryKey
  @Column
  idRestricao: number;
  @Column
  nomeRestricao: string;

  @BelongsTo(()=> ReceitaEntity , 'idRestricao')
  receitas : ReceitaEntity[]

  @BelongsTo(()=> UsuarioEntity , 'idRestricao')
  usuarios : UsuarioEntity[]
}


