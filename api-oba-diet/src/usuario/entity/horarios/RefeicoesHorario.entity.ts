import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, IsDate, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript"
import { ReceitaEntity, horarios_refeicoes } from "../../../receitas/entities/Receita.entity"
import { UsuarioEntity } from "../UsuarioEntity.entity"

@Table({modelName:'horarios_refeicoes', createdAt:false, deletedAt:false})
export class RefeicoesHorariosEntity extends Model{

  @ForeignKey(() => UsuarioEntity)
  @ForeignKey(() => ReceitaEntity)
  @PrimaryKey
  @AutoIncrement
  @Column
  idHorarios : number

  @Column({type : 'time'})
  horario : string

  @Column({type: DataType.ENUM('Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar')})
  tipo : string

  @IsDate
  @Column({type : 'date'})
  data : string 

  @Column
  repetir: string
  

  @Column
  qtdRepeteCada : number

  @Column
  quandoRepeteCada : string 

  @Column
  diasDaSemanaRepeticao : string 

  @Column
  qndTermina : string 

  @Column
  qndTerminaData : string 
  @Column
  qndTerminaHorario : string 
  @Column
  nmrRepeticoesTermino : number

  @HasMany(() => usuarios_has_horarios_refeicoes)
  horariosRefeicoes : usuarios_has_horarios_refeicoes[]

  @HasMany(()=> horarios_refeicoes )
  horariosReceitas : horarios_refeicoes[]


}


@Table({modelName:'usuarios_has_horarios_refeicoes', createdAt:false, deletedAt:false})
export class usuarios_has_horarios_refeicoes extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  usuarios_id : number

  @ForeignKey(()=> RefeicoesHorariosEntity)
  @PrimaryKey
  @Column
  horarios_refeicoes_idhorarios:number


  @BelongsTo(()=> UsuarioEntity)
  usuarios : UsuarioEntity[]
 
  @BelongsTo(()=> RefeicoesHorariosEntity)
  horariosRefeicao : RefeicoesHorariosEntity[]



}

enum TIPO{
    Cafe_da_manha = 'Café da manhã', 
    Lanche_da_manha = 'Lanche da manhã', 
    Almoco = 'Almoço', 
    Lanche_da_tarde = 'Lanche da tarde', 
    Jantar = 'Jantar'
}