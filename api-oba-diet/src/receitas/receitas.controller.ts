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

@Controller('obadiet')
export class ReceitasController {
  constructor(private readonly _repository: ReceitasRepository) {}

  @IsPublic()
  @Get('receitas')
  getReceitas() {
    return this._repository.listarReceitas();
  }

  @IsPublic()
  @Get('receita/:id')
  getReceita(@Param() id) {
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

    return this._repository.criarReceita(receitaEntity);
  }

  @IsPublic()
  @Put('editarReceita/:id')
  updateReceita(@Param('id') id, @Body() receita: ReceitaDto) {
    const receitaEntity: ReceitaEntity = new ReceitaEntity();

    receitaEntity.nome = receita.nome;
    receitaEntity.ingredientes = receita.ingredientes;
    receitaEntity.modoPreparo = receita.modoPreparo;

    return this._repository.editarReceita(id, receitaEntity);
  }

  @IsPublic()
  @Delete('deletarReceita/:id')
  removeReceita(@Param('id') id) {
    return this._repository.deletarReceita(id);
  }
}
