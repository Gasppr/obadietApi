import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReceitasRepository } from './repository/Receitas.repository';
import { ReceitaEntity } from './entities/Receita.entity';
import { ReceitaDto } from './dto/Receita.dto';

@Controller('receitas')
export class ReceitasController {
    constructor(private readonly _repository: ReceitasRepository) {
        this.preCadastrarReceitasRepository();
    }

    private async preCadastrarReceitasRepository() {
        this._repository.add(
            {
                id: 1,
                restricoes: [
                    {
                        idRestricao: 1,
                        nomeRestricao: 'gluten'
                    },
                    {
                        idRestricao: 2,
                        nomeRestricao: 'lactose'
                    }
                ],
                doencas: [
                    {
                        idDoenca: 1,
                        nomeDoenca: 'diabetes'
                    }
                ],
                nome: 'bolo açucarado',
                ingredientes: 'açucar',
                modoPreparo: 'bata o açucar e asse em 180°C por 60min'
            } as ReceitaEntity);

        this._repository.add(
            {
                id: 2,
                restricoes: [],
                doencas: [
                    {
                        idDoenca: 2,
                        nomeDoenca: 'colesterol'
                    }
                ],
                nome: 'salgadinho frito com muito óleo',
                ingredientes: 'óleo',
                modoPreparo: 'bata o óleo e frite em óleo abundante quente'
            } as ReceitaEntity);
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

    @Get()
    getReceitas() {
        return this._repository.list();
    }

    @Get(':id')
    getReceita(@Param('id') id) {
        return this._repository.search(id);
    }

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
