import { Column, PrimaryKey, Table, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany } from "sequelize-typescript";
import { ReceitaEntity, Receita_has_restricoes } from "./Receita.entity";
import { UsuarioEntity, Usuario_Has_Restricoes } from "../../usuario/entity/UsuarioEntity.entity";

@Table({modelName: 'restricoes', deletedAt:false, createdAt:false})
export class RestricaoEntity extends Model {


  @PrimaryKey
  @Column
  idRestricao: number;
  @Column
  nomeRestricao: string;

  @HasMany(()=> Receita_has_restricoes)
  receitaHasCategoria : Receita_has_restricoes[]
    
  @HasMany(()=> Usuario_Has_Restricoes)
  usuario_has_restricoes : Receita_has_restricoes[]



}





