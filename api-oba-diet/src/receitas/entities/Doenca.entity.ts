import { BelongsTo, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ReceitaEntity } from "./Receita.entity";
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from "../../usuario/entity/UsuarioEntity.entity";

@Table({modelName:'doencas' })
export class DoencaEntity extends Model {
  @PrimaryKey
  @Column
  idDoenca: number;

  @Column
  nomeDoenca: string;

  @BelongsTo(()=> ReceitaEntity , 'idDoenca')
  receitas : ReceitaEntity[]

 @BelongsToMany(()=> UsuarioEntity, ()=> Usuario_Has_Doencas)
 usuarios: UsuarioEntity[]

 @HasMany(() => Usuario_Has_Doencas)
 UsuarioHasRestricoes : Usuario_Has_Doencas[]

}
