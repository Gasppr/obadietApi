import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas/receitas.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity } from './usuario/entity/UsuarioEntity.entity';
import {  ReceitaEntity } from './receitas/entitys/Receita.entity';
import { Restricao } from './receitas/entitys/Restricao.entity';
import { Doenca } from './receitas/entitys/Doenca.entity';


@Module({
  imports: [
    ConfigModule.forRoot
    (
      { load: [configuration], 
        isGlobal: true,
        envFilePath:['.env.development', '.env']}
      ),  
      AuthModule, 
      UsuarioModule,

      SequelizeModule.forRoot(
        {
          dialect: 'mysql',
          host: process.env.DATABASE_USER,
          port: 3306,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_URL,
          models: [UsuarioEntity, ReceitaEntity, ],
          retryAttempts: 10,
          synchronize: true
     
        
      }),
        
    ],
  controllers: [ ReceitasController],
  providers: [],
})
export class AppModule {}
