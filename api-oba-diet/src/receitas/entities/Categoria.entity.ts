import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";

@Table({ tableName: 'categoria', deletedAt: false, createdAt: false })
export class CategoriaEntity extends Model {

    @PrimaryKey
    @Column
    idCategoria: string;
    @Column
    nomeCategoria: string;

    @BelongsTo(() => ReceitaEntity, 'idCategoria')
    receitas: ReceitaEntity[]

}