import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum TIPO {
  Cafe_da_manha = 'Café da manhã',
  Lanche_da_manha = 'Lanche da manhã',
  Almoco = 'Almoço',
  Lanche_da_tarde = 'Lanche da tarde',
  Jantar = 'Jantar',
}

export class Horarios_RefeicoesDto {
  
  @IsNumber()
  idHorarios: number;

  @IsString()
  data: string;

  @IsEnum(TIPO)
  @IsString()
  tipo: string;

  @IsString()
  horarios: string;

  @IsNumber()
  qtdRepeteCada: number;

  @IsString()
  quandoRepeteCada: string;

  @IsString()
  diasDaSemanaRepeticao: string;

  @IsString()
  qndTermina: string;

  @IsString()
  qndTerminaData: string;

  @IsString()
  qndTerminaHorario: string;

  @IsNumber()
  nmrRepeticoesTermino: number;

  @IsNumber()
  receita_id: number;
}
