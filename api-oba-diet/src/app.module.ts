import { Module } from '@nestjs/common';


import { UsuarioController } from './usuario/usuario.controller';
import { ReceitasController } from './receitas/receitas.controller';
import { UsuarioRepository } from './usuario/repository/Usuario.repository';

@Module({
  imports: [],
  controllers: [UsuarioController, ReceitasController],
  providers: [UsuarioRepository],
})
export class AppModule {}
