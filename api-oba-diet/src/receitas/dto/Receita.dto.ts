import {  IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { DoencaDto } from "./Doenca.dto";
import { RestricaoDto } from "./Restricao.dto";
import { Type } from "class-transformer";
import { CategoriaEntity } from "../entities/Categoria.entity";

export class ReceitaDto {


    id: number


    @IsString({ message: 'O nome tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    nome: string
    
    @IsString({ message: 'Ingredientes tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    ingredientes: string

    @IsString({ message: 'O modo de preparo tem que ser um texto' })
    @IsNotEmpty({ message: 'Esse campo não pode ser vazio' })
    modoPreparo: string

    @IsString({message: "Precisa ser uma URL válida"})
    imagem: string

   

    @ValidateNested()
    @Type(() => DoencaDto)
    doencas: DoencaDto[]

     @ValidateNested()
    @Type(() => RestricaoDto)
    restricoes: RestricaoDto[]

    @ValidateNested()
    @Type(()=> CategoriaEntity)
    categorias: CategoriaEntity[]
}