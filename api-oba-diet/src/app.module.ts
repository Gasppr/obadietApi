import { Module } from '@nestjs/common';

import { UsuarioController } from './usuario/usuario.controller';
import { ReceitasController } from './receitas/receitas.controller';
import { UsuarioRepository } from './usuario/repository/Usuario.repository';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ConfigModule.forRoot
    (
      { load: [configuration], 
        isGlobal: true,
        envFilePath:['.env.development', '.env']}
      ),  
      AuthModule, UsuarioModule],
  controllers: [ ReceitasController],
  providers: [],
})
export class AppModule {}
