import {
  BelongsToMany,
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

@Table({ tableName: 'receita', deletedAt: false, createdAt: false })
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

  @BelongsToMany(() => RestricaoEntity, ()=> Receita_has_restricoes)
  restricoes: RestricaoEntity[];

  @BelongsToMany(() => ReceitaEntity, ()=> Receita_has_doencas)
  doencas: DoencaEntity[];
}

@Table({ modelName: 'receita_has_doencas', deletedAt: false, createdAt: false })
export class Receita_has_doencas extends Model {
  
  @ForeignKey(()=> ReceitaEntity)
  @Column
  receita_id: number;

  @ForeignKey(()=> DoencaEntity)
  @Column
  doencas_idDoenca: number;
}

@Table({ modelName: 'receita_has_restricoes', deletedAt: false, createdAt: false })
export class Receita_has_restricoes extends Model {
  
  @ForeignKey(()=> ReceitaEntity)
  @Column
  receita_id: number;

  @ForeignKey(()=> RestricaoEntity)
  @Column
  restricoes_idRestricoes: number;
}

