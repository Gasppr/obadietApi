import { BelongsTo, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity, Receita_has_categoria } from "./Receita.entity";

@Table({ tableName: 'categoria', deletedAt: false, createdAt: false })
export class CategoriaEntity extends Model {

    @PrimaryKey
    @Column
    idCategoria: string;
    @Column
    nomeCategoria: string;

    @HasMany(()=> Receita_has_categoria)
    receitaHasCategoria : Receita_has_categoria[]

}