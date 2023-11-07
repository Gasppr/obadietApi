import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReceitasRepository } from './repository/Receitas.repository';
import { ReceitaEntity } from './entities/Receita.entity';
import { ReceitaDto } from './dto/Receita.dto';
import { IsPublic } from 'src/auth/guard/isPublic.decorator';
import { ApiBody, ApiTags} from "@nestjs/swagger"

@ApiTags('Receitas')
@Controller('obadiet')
export class ReceitasController {
  constructor(private readonly _repository: ReceitasRepository) {}

  @IsPublic()
  @Get('doencas')
  BuscarDoencas(){
    return this._repository.buscarDoencas()
  }
  @IsPublic()
  @Get('restricoes')
  BuscarRestricoes(){
    return this._repository.buscarRestricoes()
  }

  @IsPublic()
  @Get('receitas')
  getReceitas() {
    return this._repository.listarReceitas();
  }

  @IsPublic()
  @Get('receita/:id')
  getReceita(@Param('id') id : number) {
    return this._repository.procurarReceita(id);
  }

  @IsPublic()
  @Post('novaReceita')
  createReceita(@Body() receita: ReceitaDto) {
    const receitaEntity: ReceitaEntity = new ReceitaEntity();

    receitaEntity.id = receita.id;
    receitaEntity.nome = receita.nome;
    receitaEntity.ingredientes = receita.ingredientes;
    receitaEntity.modoPreparo = receita.modoPreparo;

    return this._repository.criarReceita(receitaEntity, receita.doencas, receita.restricoes, receita.categorias);
  }

  @IsPublic()
  @Put('editarReceita/:id')
  updateReceita(@Param('id') id : number, @Body() receita: ReceitaDto) {
    const receitaEntity: ReceitaEntity = new ReceitaEntity();

    receitaEntity.nome = receita.nome;
    receitaEntity.ingredientes = receita.ingredientes;
    receitaEntity.modoPreparo = receita.modoPreparo;

    return this._repository.editarReceita(id, receitaEntity);
  }

  @IsPublic()
  @Delete('deletarReceita/:id')
  removeReceita(@Param('id') id : number) {
    return this._repository.deletarReceita(id);
  }


}
