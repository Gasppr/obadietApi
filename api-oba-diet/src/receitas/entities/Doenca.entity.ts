import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({modelName:'doencas' , createdAt: false, deletedAt: false})
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;
  
}
