import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsuarioRepository } from 'src/usuario/repository/Usuario.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [UsuarioModule,
    JwtModule.register({
      global: true,
      secret : jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
