import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsPublic } from '../../auth/guard/isPublic.decorator';
import { UsuarioRepository } from '../repository/Usuario.repository';
import { ApiTags } from '@nestjs/swagger';
import { RemediosHorariosEntity } from '../entity/horarios/RemediosHorario.entity';
import { HorariosRepository } from '../repository/Horarios.repository';
import { Horarios_remediosDto } from '../dto/horarios_remedios.dto';
import { RefeicoesHorariosEntity } from '../entity/horarios/RefeicoesHorario.entity';
import { Horarios_RefeicoesDto } from '../dto/horarios_refeicoes.dto ';


@ApiTags('Horarios')
@Controller('obadiet')
export class HorariosController {
  constructor(
    private readonly horarios: HorariosRepository
  ) {}

  @Get('refeicoes/:token')
  @IsPublic()
  BuscarReceitas(@Param('token') token: string) {
    return this.horarios.listarReceitas(token);
  }

  @Get('remedios/:token')
  @IsPublic()
  BuscarRemedios(@Param('token') token: string) {
    return this.horarios.listarRemedios(token);
  }

  @Post('CriarHorarioRefeicoes/:token')
  @IsPublic()
  async criarHorarioRefeicoes(
    @Body() horarioRefeicoesDto: Horarios_RefeicoesDto,
    @Param('token') idUsuario: string,
  ) {
    const horarioRefeicao: RefeicoesHorariosEntity =
      new RefeicoesHorariosEntity();


    horarioRefeicao.data = horarioRefeicoesDto.data;
    horarioRefeicao.repetir = horarioRefeicoesDto.repetir
    horarioRefeicao.tipo = horarioRefeicoesDto.tipo;
    horarioRefeicao.horario = horarioRefeicoesDto.horarios;
    horarioRefeicao.qtdRepeteCada = horarioRefeicoesDto.qtdRepeteCada;
    horarioRefeicao.quandoRepeteCada = horarioRefeicoesDto.quandoRepeteCada;
    horarioRefeicao.diasDaSemanaRepeticao =
      horarioRefeicoesDto.diasDaSemanaRepeticao;
    horarioRefeicao.qndTermina = horarioRefeicoesDto.qndTermina;
    horarioRefeicao.qndTerminaData = horarioRefeicoesDto.qndTerminaData;
    horarioRefeicao.qndTerminaHorario = horarioRefeicoesDto.qndTerminaHorario;
    horarioRefeicao.nmrRepeticoesTermino =
      horarioRefeicoesDto.nmrRepeticoesTermino;
   

    return await this.horarios.criarHorarioPraRefeicoes(
      horarioRefeicao,
      idUsuario,
      horarioRefeicoesDto.receita_id,
      horarioRefeicoesDto.receitas
    );
  }

  @Post('CriarHorarioRemedios/:token')
  @IsPublic()
  async criarHorarioRemedios(
    @Body() horarioRemedioDto: Horarios_remediosDto,
    @Param('token') idUsuario: string,
  ) {
    const horarioRemedio: RemediosHorariosEntity = new RemediosHorariosEntity();

    horarioRemedio.data = horarioRemedioDto.data;
    horarioRemedio.nomeRemedio = horarioRemedioDto.nomeRemedio;
    horarioRemedio.repetir = horarioRemedioDto.repetir;
    horarioRemedio.horarios = horarioRemedioDto.horarios;
    horarioRemedio.qtdRepeteCada = horarioRemedioDto.qtdRepeteCada;
    horarioRemedio.quandoRepeteCada = horarioRemedioDto.quandoRepeteCada;
    horarioRemedio.diasDaSemanaRepeticao =
      horarioRemedioDto.diasDaSemanaRepeticao;
    horarioRemedio.qndTermina = horarioRemedioDto.qndTermina;
    horarioRemedio.qndTerminaData = horarioRemedioDto.qndTerminaData;
    horarioRemedio.qndTerminaHorario = horarioRemedioDto.qndTerminaHorario;
    horarioRemedio.nmrRepeticoesTermino =
      horarioRemedioDto.nmrRepeticoesTermino;

    return await this.horarios.criarHorarioPraRemedios(
      horarioRemedio,
      idUsuario,
    );
  }

  @Patch('editarHorarioRefeicao/:token')
  @IsPublic()
  async editarHorariosRefeicao(
    @Param('token') token : string,
    @Body() horarioRefeicoesDto: Horarios_RefeicoesDto,
  ) {
    const horarioRefeicao: RefeicoesHorariosEntity =
      new RefeicoesHorariosEntity();

    horarioRefeicao.idHorarios = horarioRefeicoesDto.idHorarios;
    horarioRefeicao.data = horarioRefeicoesDto.data;
    horarioRefeicao.tipo = horarioRefeicoesDto.tipo;
    horarioRefeicao.repetir = horarioRefeicoesDto.repetir
    horarioRefeicao.horario = horarioRefeicoesDto.horarios;
    horarioRefeicao.qtdRepeteCada = horarioRefeicoesDto.qtdRepeteCada;
    horarioRefeicao.quandoRepeteCada = horarioRefeicoesDto.quandoRepeteCada;
    horarioRefeicao.diasDaSemanaRepeticao =
    horarioRefeicoesDto.diasDaSemanaRepeticao;
    horarioRefeicao.qndTermina = horarioRefeicoesDto.qndTermina;
    horarioRefeicao.qndTerminaData = horarioRefeicoesDto.qndTerminaData;
    horarioRefeicao.qndTerminaHorario = horarioRefeicoesDto.qndTerminaHorario;
    horarioRefeicao.nmrRepeticoesTermino =
    horarioRefeicoesDto.nmrRepeticoesTermino;


    return await this.horarios.editarHorariosRefeicoes(token , horarioRefeicao, horarioRefeicoesDto.receita_id);
  }

  @Patch('editarHorarioRemedio/:token')
  @IsPublic()
  async editarHorariosRemedios(
    @Param('token') token : string,
    @Body() horarioRemedioDto: Horarios_remediosDto,
  ) {
    const horarioRemedio: RemediosHorariosEntity = new RemediosHorariosEntity();

    horarioRemedio.idHorario = horarioRemedioDto.idHorario;
    horarioRemedio.data = horarioRemedioDto.data;
    horarioRemedio.nomeRemedio = horarioRemedioDto.nomeRemedio;
    horarioRemedio.repetir = horarioRemedioDto.repetir;
    horarioRemedio.horarios = horarioRemedioDto.horarios;
    horarioRemedio.qtdRepeteCada = horarioRemedioDto.qtdRepeteCada;
    horarioRemedio.quandoRepeteCada = horarioRemedioDto.quandoRepeteCada;
    horarioRemedio.diasDaSemanaRepeticao =
      horarioRemedioDto.diasDaSemanaRepeticao;
    horarioRemedio.qndTermina = horarioRemedioDto.qndTermina;
    horarioRemedio.qndTerminaData = horarioRemedioDto.qndTerminaData;
    horarioRemedio.qndTerminaHorario = horarioRemedioDto.qndTerminaHorario;
    horarioRemedio.nmrRepeticoesTermino =
      horarioRemedioDto.nmrRepeticoesTermino;

    return await this.horarios.editarHorariosRemedios(token , horarioRemedio);
  }

  @Delete('deletarHorarioRefeicao/:token')
  @IsPublic()
  async deletarRefeicoes(@Param('token') token : string ,@Body() { id }: { id: number }) {

    
    return await this.horarios.deletarHorariosRefeicoes(token , id);
  }

  @Delete('deletarHorarioRemedio/:token')
  @IsPublic()
  async deletarRemedios(@Param('token') token : string , @Body()  id : { id: number }) {

    if(!token) return { mensagem : 'token inváilido'}

    return await this.horarios.deletarHorariosRemedios(token , id.id);
  }
}
