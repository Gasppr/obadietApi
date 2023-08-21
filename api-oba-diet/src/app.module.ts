import { Module } from '@nestjs/common';


import { UsuarioController } from './usuario/usuario.controller';
import { LoginController } from './usuario/login/login.controller';
import { ReceitasController } from './receitas/receitas.controller';

@Module({
  imports: [],
  controllers: [UsuarioController, LoginController, ReceitasController],
  providers: [],
})
export class AppModule {}
