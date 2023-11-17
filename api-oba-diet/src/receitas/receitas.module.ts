import { Module } from '@nestjs/common';
import { ReceitaEntity, Receita_has_categoria, Receita_has_doencas, Receita_has_restricoes } from './entities/Receita.entity';
import { ReceitasRepository } from './repository/Receitas.repository';
import { ReceitasController } from './receitas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoencaEntity } from './entities/Doenca.entity';
import { RestricaoEntity } from './entities/Restricao.entity';
import { CategoriaEntity } from './entities/Categoria.entity';

@Module({

    imports: [
        ReceitasModule,
        SequelizeModule.forFeature([ReceitaEntity, Receita_has_doencas, Receita_has_restricoes, DoencaEntity, RestricaoEntity, CategoriaEntity, Receita_has_categoria])
      ],
      providers: [ReceitasRepository],
      exports: [ReceitasRepository],
      controllers: [ReceitasController],
})
export class ReceitasModule {}
