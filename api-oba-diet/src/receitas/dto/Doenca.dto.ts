import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class DoencaDto{
    @IsInt({ message: 'O id tem que ser um número inteiro' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    idDoenca : number

    @IsString({ message: 'O nome tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    nomeDoenca : string
}