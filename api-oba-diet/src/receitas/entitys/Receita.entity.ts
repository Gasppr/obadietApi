import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"


@Table
export class ReceitaEntity extends Model{

    @PrimaryKey
    @Column
    id : number

    @Column
    idRestrições : number

    @Column
    nome : string

    @Column
    ingredientes : string

    @Column
    modoPreparo : string
}