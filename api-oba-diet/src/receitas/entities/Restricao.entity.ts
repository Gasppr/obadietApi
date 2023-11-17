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

  @BelongsTo(()=> ReceitaEntity , 'idRestricao')
  receitas : ReceitaEntity[]
    


  @BelongsToMany(()=> UsuarioEntity, ()=> Usuario_Has_Restricoes)
  usuarios : UsuarioEntity[]

  @HasMany(() => Usuario_Has_Restricoes)
  UsuarioHasRestricoes : Usuario_Has_Restricoes[]

  @HasMany(() => Receita_has_restricoes)
  ReceitasHasRestricoes : Receita_has_restricoes[]

}





