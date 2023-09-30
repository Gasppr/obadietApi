import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsuarioRepository } from 'src/usuario/repository/Usuario.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [UsuarioModule,
    JwtModule.register({
      global: true,
      secret : jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
    }),


  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass:AuthGuard}]
})
export class AuthModule {}
