import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({modelName:'doencas' })
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;
  
}
