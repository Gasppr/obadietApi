import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString,  } from "class-validator";
import { AutoIncrement } from "sequelize-typescript";


export class Horarios_remediosDto {

    
    @IsNumber()
    idHorario: number 

    @IsString()
    data: string

    @IsString()
    nomeRemedio: string

    @IsString()
    repetir: string

    @IsString()
    horarios: string

    @IsNumber()
    qtdRepeteCada: number

    @IsString()
    quandoRepeteCada: string

    @IsString()
    diasDaSemanaRepeticao: string

    @IsString()
    qndTermina: string

    @IsString()
    qndTerminaData: string

    @IsString()
    qndTerminaHorario: string

    @IsNumber()
    nmrRepeticoesTermino: number
}