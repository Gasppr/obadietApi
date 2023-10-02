import { Model,Column, Table, IsUUID, PrimaryKey, BelongsToMany, HasMany } from "sequelize-typescript"
import { ReceitaEntity } from "src/receitas/entitys/Receita.entity"
import { Restricao } from "src/receitas/entitys/Restricao.entity"


export enum sexoEnum{
    "MASCULINO" = "Masculino",
    "FEMININO" = "Feminino"
}

@Table
export class UsuarioEntity extends Model{


    
    @IsUUID("all")
    @PrimaryKey
    @Column
    id : string 

    @Column
    nome : String 

    @Column
    email: String

    @Column
    sexo: sexoEnum

    @Column
    idade : number

    @Column
    peso : number

    @Column
    altura : number

    @Column
    senha: String

    @HasMany(() => ReceitaEntity)
    restricoes : ReceitaEntity[]
    
}