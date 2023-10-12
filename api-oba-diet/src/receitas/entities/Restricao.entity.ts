import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({modelName: 'restricoes', deletedAt:false, createdAt:false})
export class RestricaoEntity extends Model {

  @PrimaryKey
  @Column
  idRestricao: number;
  @Column
  nomeRestricao: string;

}


