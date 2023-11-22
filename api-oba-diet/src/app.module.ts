import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas/receitas.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from './usuario/entity/UsuarioEntity.entity';
import { ReceitaEntity, Receita_has_categoria, Receita_has_doencas, Receita_has_restricoes } from './receitas/entities/Receita.entity';
import { RestricaoEntity } from './receitas/entities/Restricao.entity';
import { DoencaEntity } from './receitas/entities/Doenca.entity';
import { ReceitasRepository } from './receitas/repository/Receitas.repository';
import { ReceitasModule } from './receitas/receitas.module';
import { CategoriaEntity } from './receitas/entities/Categoria.entity';
import mysql2 from 'mysql2';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    AuthModule,
    UsuarioModule,
    ReceitasModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      dialectModule: mysql2,
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
        Usuario_Has_Doencas,
        Receita_has_doencas,
        Receita_has_restricoes,
        CategoriaEntity,
        Receita_has_categoria
      ],
      retryAttempts: 100,
      synchronize: true,
      define: {
        timestamps: false,
      },
    }),
    ReceitasModule,

   
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
