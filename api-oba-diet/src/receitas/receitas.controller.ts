import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReceitasRepository } from './repository/Receitas.repository';
import { ReceitaEntity } from './entities/Receita.entity';
import { ReceitaDto } from './dto/Receita.dto';
import { IsPublic } from 'src/auth/guard/isPublic.decorator';

@Controller('obadiet')
export class ReceitasController {
    constructor(private readonly _repository: ReceitasRepository) {
       
    }

    @IsPublic()
    @Get("receitas")
    getReceitas() {
        return this._repository.listarReceitas();
    }

    @IsPublic()
    @Get('receita/:id')
    getReceita(@Param('id') id) {
        return this._repository.procurarReceita(id);
    }

      // @Post()
    // createReceita(@Body() receita: ReceitaDto) {
    //     const receitaEntity: ReceitaEntity = new ReceitaEntity();

    //     receitaEntity.id = receita.id;
    //     receitaEntity.restricoes = receita.restricoes;
    //     receitaEntity.doencas = receita.doencas;
    //     receitaEntity.nome = receita.nome;
    //     receitaEntity.ingredientes = receita.ingredientes;
    //     receitaEntity.modoPreparo = receita.modoPreparo;

    //     return this._repository.add(receitaEntity);
    // }

    // @Put(':id')
    // updateReceita(@Param('id') id, @Body() receita: ReceitaDto) {
    //     const receitaEntity: ReceitaEntity = new ReceitaEntity();

    //     receitaEntity.restricoes = receita.restricoes;
    //     receitaEntity.doencas = receita.doencas;
    //     receitaEntity.nome = receita.nome;
    //     receitaEntity.ingredientes = receita.ingredientes;
    //     receitaEntity.modoPreparo = receita.modoPreparo;

    //     return this._repository.update(id, receitaEntity);
    // }

    @Delete(':id')
    removeReceita(@Param() param) {
        return this._repository.remove(param.id);
    }
}
