import { Module } from '@nestjs/common';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UsuarioController } from './usuario.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from './entity/UsuarioEntity.entity';
import { RestricaoEntity } from '../receitas/entities/Restricao.entity';
import { DoencaEntity } from '../receitas/entities/Doenca.entity';
import { criptografia } from './criptografia';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({


  imports: [


    MailerModule.forRoot(
      {
        transport: {

          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },

        }
      }

    ),

    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),


    UsuarioModule,
    criptografia,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),

    SequelizeModule.forFeature([UsuarioEntity, RestricaoEntity, DoencaEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes]),


  ],

  providers: [UsuarioRepository, JwtService, criptografia],
  exports: [UsuarioRepository],
  controllers: [UsuarioController],
})
export class UsuarioModule { }
