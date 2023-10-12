import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas/receitas.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from './usuario/entity/UsuarioEntity.entity';
import { ReceitaEntity } from './receitas/entities/Receita.entity';
import { RestricaoEntity } from './receitas/entities/Restricao.entity';
import { DoencaEntity } from './receitas/entities/Doenca.entity';
import { ReceitasRepository } from './receitas/repository/Receitas.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    AuthModule,
    UsuarioModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_URL,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [
        UsuarioEntity, 
        ReceitaEntity, 
        RestricaoEntity, 
        DoencaEntity, 
        Usuario_Has_Restricoes,
        Usuario_Has_Doencas
      ],
      retryAttempts: 100,
      synchronize: true,
      define: {
        timestamps: false,
      },
    }),
  ],
  controllers: [ReceitasController],
  providers: [ReceitasRepository],
})
export class AppModule {}
