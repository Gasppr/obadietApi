import { Model,Column, Table, IsUUID, PrimaryKey, BelongsToMany, HasMany, ForeignKey } from "sequelize-typescript"
import { ReceitaEntity } from "src/receitas/entitys/Receita.entity"
import { Restricao } from "src/receitas/entitys/Restricao.entity"


export enum sexoEnum{
    "MASCULINO" = "Masculino",
    "FEMININO" = "Feminino"
}

@Table({tableName : 'usuarios'})
export class UsuarioEntity extends Model{


    
    @IsUUID("all")
    @PrimaryKey
    @ForeignKey(()=> ReceitaEntity)
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
    receitas : ReceitaEntity[]

 


    
}
