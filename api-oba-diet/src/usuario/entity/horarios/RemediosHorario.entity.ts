import {  AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, IsDate, Model, PrimaryKey, Table } from "sequelize-typescript"
import { UsuarioEntity } from "../UsuarioEntity.entity"


@Table({modelName:'horarios_remedios', createdAt:false, deletedAt:false})
export class RemediosHorariosEntity extends Model{

  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  idHorario : number
  
    @IsDate
    @Column
    data : Date 

    @Column
    nomeRemedio: string 

    @Column
    repetir : string 

    @Column({type : 'time'})
    horarios : string

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


    @HasMany(() => usuarios_has_horarios_remedios, 'idHorario')
    horariosHasRemedios : usuarios_has_horarios_remedios[]

}


@Table({modelName:'usuarios_has_horarios_remedios', createdAt:false, deletedAt:false})
export class usuarios_has_horarios_remedios extends Model{
  
  @ForeignKey(()=> RemediosHorariosEntity)
  @PrimaryKey
  @Column
  horarios_remedios_idHorario : number
 
  @ForeignKey(() => UsuarioEntity)
  @PrimaryKey
  @Column
  usuarios_id : string

  @BelongsTo(()=> RemediosHorariosEntity)
  horariosRemedios : RemediosHorariosEntity[]
 
  @BelongsTo(()=> UsuarioEntity)
  usuarios : UsuarioEntity[]

}