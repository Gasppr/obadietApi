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

  @Get('refeicoes/:id')
  @IsPublic()
  BuscarReceitas(@Param('id') id: string) {
    return this.horarios.listarReceitas(id);
  }

  @Get('remedios/:id')
  @IsPublic()
  BuscarRemedios(@Param('id') id: string) {
    return this.horarios.listarRemedios(id);
  }

  @Post('CriarHorarioRefeicoes/:id')
  @IsPublic()
  async criarHorarioRefeicoes(
    @Body() horarioRefeicoesDto: Horarios_RefeicoesDto,
    @Param('id') idUsuario: string,
  ) {
    const horarioRefeicao: RefeicoesHorariosEntity =
      new RefeicoesHorariosEntity();


    horarioRefeicao.data = horarioRefeicoesDto.data;
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
    horarioRefeicao.receita_id = horarioRefeicoesDto.receita_id;

    return await this.horarios.criarHorarioPraRefeicoes(
      horarioRefeicao,
      idUsuario,
    );
  }

  @Post('CriarHorarioRemedios/:id')
  @IsPublic()
  async criarHorarioRemedios(
    @Body() horarioRemedioDto: Horarios_remediosDto,
    @Param('id') idUsuario: string,
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

  @Patch('editarHorarioRefeicao')
  @IsPublic()
  async editarHorariosRefeicao(
    @Body() horarioRefeicoesDto: Horarios_RefeicoesDto,
  ) {
    const horarioRefeicao: RefeicoesHorariosEntity =
      new RefeicoesHorariosEntity();

    horarioRefeicao.idHorarios = horarioRefeicoesDto.idHorarios;
    horarioRefeicao.data = horarioRefeicoesDto.data;
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
    horarioRefeicao.receita_id = horarioRefeicoesDto.receita_id;

    return await this.horarios.editarHorariosRefeicoes(horarioRefeicao);
  }

  @Patch('editarHorarioRemedio')
  @IsPublic()
  async editarHorariosRemedios(
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

    return await this.horarios.editarHorariosRemedios(horarioRemedio);
  }

  @Delete('deletarHorarioRefeicao/:token')
  @IsPublic()
  async deletarRefeicoes(@Param('token') token : string ,@Body() { id }: { id: number }) {

    
    return await this.horarios.deletarHorariosRefeicoes(token , id);
  }

  @Delete('deletarHorarioRemedio/:token')
  @IsPublic()
  async deletarRemedios(@Param('token') token : string , @Body() { id }: { id: number }) {

    if(!token) return { mensagem : 'token inváilido'}

    return await this.horarios.deletarHorariosRemedios(token , id);
  }
}
