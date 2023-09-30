import { IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { DoencaDto } from "./Doenca.dto"
import { RestricaoDto } from "./Restricao.dto"
import { Type } from "class-transformer"

export class ReceitaDto {
    @IsInt({ message: 'O id tem que ser um número inteiro' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    id: number

    @ValidateNested()
    @Type(() => RestricaoDto)
    restricoes: RestricaoDto[]

    @ValidateNested()
    @Type(() => DoencaDto)
    doencas: DoencaDto[]

    @IsString({ message: 'O nome tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    nome: string
    
    @IsString({ message: 'Ingredientes tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    ingredientes: string

    @IsString({ message: 'O modo de preparo tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    modoPreparo: string
}