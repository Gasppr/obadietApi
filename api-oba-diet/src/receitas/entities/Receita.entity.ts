import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DoencaEntity } from './Doenca.entity';
import { RestricaoEntity } from './Restricao.entity';
import { UsuarioEntity } from 'src/usuario/entity/UsuarioEntity.entity';

@Table({tableName: "receitas", deletedAt: false, createdAt: false })
export class ReceitaEntity extends Model {
  
  @PrimaryKey
  @ForeignKey(() => UsuarioEntity)
  @Column
  id: number;

  @Column
  nome: string;

  @Column
  ingredientes: string;

  @Column
  modoPreparo: string;

  //@HasMany(()=> RestricaoEntity )
  restricoes: RestricaoEntity[];

  //@HasMany(()=> RestricaoEntity )
  doencas: DoencaEntity[];
}
