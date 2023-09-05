import { Module } from '@nestjs/common';

import { UsuarioController } from './usuario/usuario.controller';
import { ReceitasController } from './receitas/receitas.controller';
import { UsuarioRepository } from './usuario/repository/Usuario.repository';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [ConfigModule.forRoot({load: [configuration]})],
  controllers: [UsuarioController, ReceitasController],
  providers: [UsuarioRepository],
})
export class AppModule {}
