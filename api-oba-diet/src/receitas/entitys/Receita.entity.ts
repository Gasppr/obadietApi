import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { UsuarioEntity } from "src/usuario/entity/UsuarioEntity.entity"


@Table
export class ReceitaEntity extends Model{

    @PrimaryKey
    @ForeignKey(() => UsuarioEntity)
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