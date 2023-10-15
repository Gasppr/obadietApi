import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class RestricaoDto {
    @IsInt({ message: 'O id tem que ser um número inteiro' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    idRestricao : number
    
    @IsString({ message: 'O nome tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    nomeRestricao : string
}