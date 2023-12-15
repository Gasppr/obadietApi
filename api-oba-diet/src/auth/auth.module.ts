import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsuarioRepository } from '../usuario/repository/Usuario.repository';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity } from '../usuario/entity/UsuarioEntity.entity';
import { jwtConstants } from './constants';
import { criptografia } from '../usuario/criptografia';

@Module({
  imports: [
    UsuarioModule,
    criptografia,
    JwtModule.register({
      global: true,
      secret : jwtConstants.secret,
      signOptions: {expiresIn: '24h'}
    }),

    
    SequelizeModule.forFeature([UsuarioEntity]),

  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass:AuthGuard}, criptografia]
})
export class AuthModule {}
