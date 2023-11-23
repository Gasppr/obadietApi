import {  AutoIncrement, Column, DataType, ForeignKey, IsDate, Model, PrimaryKey, Table } from "sequelize-typescript"
import { UsuarioEntity } from "../UsuarioEntity.entity"


@Table({modelName:'horarios_remedios', createdAt:false, deletedAt:false})
export class RemediosHorariosEntity extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    idHorarios : number

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
}


@Table({modelName:'usuarios_has_horarios_remedios', createdAt:false, deletedAt:false})
export class usuarios_has_horarios_remedios extends Model{

 
  @ForeignKey(() => UsuarioEntity)
  @Column
  usuarios_id : number

  @ForeignKey(()=> RemediosHorariosEntity)
  @Column
  horarios_remedios_idHorario:number




}