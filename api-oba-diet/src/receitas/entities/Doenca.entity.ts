import { BelongsTo, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity, Receita_has_doencas } from "./Receita.entity";
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from "../../usuario/entity/UsuarioEntity.entity";

@Table({modelName:'doencas' })
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;

  @HasMany(()=> Receita_has_doencas)
    receitaHasCategoria : Receita_has_doencas[]




}
