import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsuarioRepository } from 'src/usuario/repository/Usuario.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity } from 'src/usuario/entity/UsuarioEntity.entity';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsuarioModule,
    
    JwtModule.register({
      global: true,
      secret : jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
    }),

    
    SequelizeModule.forFeature([UsuarioEntity]),

  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass:AuthGuard}]
})
export class AuthModule {}
