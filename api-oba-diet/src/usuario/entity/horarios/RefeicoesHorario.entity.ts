import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, IsDate, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript"
import { ReceitaEntity } from "../../../receitas/entities/Receita.entity"
import { UsuarioEntity } from "../UsuarioEntity.entity"

@Table({modelName:'horarios_refeicoes', createdAt:false, deletedAt:false})
export class RefeicoesHorariosEntity extends Model{

 
  @PrimaryKey
  @AutoIncrement
  @Column
  idHorarios : number

  @Column({type : 'time'})
  horario : string

  @Column({type: DataType.ENUM('Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar')})
  tipo : TIPO

  @IsDate
  @Column
  data : Date 

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

  @PrimaryKey
  @ForeignKey(()=> ReceitaEntity)
  @Column
  receita_id : number

  @HasMany(() => usuarios_has_horarios_refeicoes)
  horariosRefeicoes : usuarios_has_horarios_refeicoes[]

 

  

}


@Table({modelName:'usuarios_has_horarios_refeicoes', createdAt:false, deletedAt:false})
export class usuarios_has_horarios_refeicoes extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> RefeicoesHorariosEntity)
  @Column
  horarios_refeicoes_idhorarios:number

  @ForeignKey(()=> ReceitaEntity)
  @Column
  horarios_refeicoes_receita_id:number

  @BelongsTo(()=> UsuarioEntity)
  usuarios : UsuarioEntity[]
 
  @BelongsTo(()=> RefeicoesHorariosEntity)
  horariosRefeicao : RefeicoesHorariosEntity[]

  @BelongsTo(()=> ReceitaEntity)
  receitas : ReceitaEntity[]


}

enum TIPO{
    Cafe_da_manha = 'Café da manhã', 
    Lanche_da_manha = 'Lanche da manhã', 
    Almoco = 'Almoço', 
    Lanche_da_tarde = 'Lanche da tarde', 
    Jantar = 'Jantar'
}