import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { sexoEnum } from "../entity/UsuarioEntity.entity";
import { ApiProperty } from '@nestjs/swagger';


export class UsuarioDto{

    @IsNotEmpty({"message" : "O campo não deve está vazio"})
    @IsString({"message" : "O campo deve está escrito por apenas letras"})
    nome : string 

    @IsNotEmpty({"message" : "O campo não deve está vazio"})
    @IsEmail()
    email: string

    @IsNotEmpty({"message" : "O campo não deve está vazio"})
    @IsEnum(sexoEnum)
    sexo: sexoEnum

    @IsInt()
    @IsNotEmpty()
    idade : number

    @IsNumber()
    @IsNotEmpty()
    peso : number

    @IsNumber()
    @IsNotEmpty()
    altura : number

    @IsNotEmpty()
    @IsString()
    senha: string

    @IsArray()
    doencas : number[]

    @IsArray()
    restricao : number[]
}