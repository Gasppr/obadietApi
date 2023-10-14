import { Module } from '@nestjs/common';
import { ReceitaEntity } from './entities/Receita.entity';
import { ReceitasRepository } from './repository/Receitas.repository';
import { ReceitasController } from './receitas.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({

    imports: [
        ReceitasModule,
        SequelizeModule.forFeature([ReceitaEntity])
      ],
      providers: [ReceitasRepository],
      exports: [ReceitasRepository],
      controllers: [ReceitasController],
})
export class ReceitasModule {}
